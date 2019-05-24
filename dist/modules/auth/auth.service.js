"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const account_service_1 = require("../account/account.service");
const api_client_service_1 = require("../api-client/api-client.service");
const constants_1 = require("../../common/helpers/auth/constants");
const sign_in_log_service_1 = require("../sign-in-log/sign-in-log.service");
const sign_in_entity_1 = require("../sign-in-log/sign-in.entity");
const account_type_service_1 = require("../account-type/account-type.service");
const exception_messages_1 = require("../../common/error-handling/exception-messages");
const constant_1 = require("../../common/helpers/constant");
const constant_2 = require("../../common/env/constant");
const typeorm_1 = require("typeorm");
const function_1 = require("../../common/helpers/function");
const transporter_1 = require("../../common/mailer/transporter");
const permission_access_service_1 = require("../permission-access/permission-access.service");
const driver_service_1 = require("../driver/driver.service");
const constant_3 = require("../api-client/constant");
let AuthService = class AuthService {
    constructor(accountService, apiClientService, signInLogService, accountTypeService, permissionAccess, driverService) {
        this.accountService = accountService;
        this.apiClientService = apiClientService;
        this.signInLogService = signInLogService;
        this.accountTypeService = accountTypeService;
        this.permissionAccess = permissionAccess;
        this.driverService = driverService;
    }
    async signIn(data, req) {
        const signInIsAllowed = await this.signInLogService.checkIfSignInIsAllowed(data.login, constants_1.MAX_SIGN_IN_INTERVAL_MINUTES, constants_1.MAX_SIGN_IN_ATTEMPTS);
        if (!signInIsAllowed) {
            throw new common_1.ForbiddenException(exception_messages_1.SIGN_IN_EXCEED_ATTEMPTS_MSG);
        }
        const { account, isEmail } = await this.getAccount(data.login);
        const client = await this.apiClientService.findOne({ value: data.api_client_id });
        if (!client) {
            throw new common_1.NotFoundException('client not found');
        }
        const signInRec = Object.assign(new sign_in_entity_1.SignIn(), {
            email: account ? account.email : isEmail ? data.login : null,
            phone_number: account ? account.phone_number : !isEmail ? data.login : null,
            ip_address: function_1.extractIpAddress(req),
            account_id: account ? account.id : null,
            api_client_id: client.id,
        });
        if (!account || account.is_deleted || account.is_blocked) {
            signInRec.is_success = false;
            await this.signInLogService.create(signInRec);
            throw new common_1.ForbiddenException(exception_messages_1.SIGN_IN_CRED_MISMATCH_MSG);
        }
        if (!await this.permissionAccess.findOne({
            account_type: account.account_type_id,
            api_client: client.value,
            is_deleted: false,
        })) {
            signInRec.is_success = false;
            await this.signInLogService.create(signInRec);
            throw new common_1.NotFoundException(constant_1.EXC_PERMISSION_ACCESS_ERROR);
        }
        const passCheck = account_service_1.AccountService.comparePasswordSync(data.password, account.password_hash);
        if (!passCheck) {
            signInRec.is_success = false;
            await this.signInLogService.create(signInRec);
            throw new common_1.ForbiddenException(exception_messages_1.SIGN_IN_CRED_MISMATCH_MSG);
        }
        let driver;
        if (client.text_value === constant_3.API_CLIENT_TYPE.adroit_driver_android || client.text_value === constant_3.API_CLIENT_TYPE.adroit_driver_ios) {
            driver = await this.driverService.getExistingDriverByAccountIdOrFail(account.id);
        }
        signInRec.is_success = true;
        await this.signInLogService.create(signInRec);
        return await this.getSignInResponse(account, client, { firebase_token: data.firebase_token, driver });
    }
    async sendConfirmationEmail(data) {
        const user = await this.accountService.findOne({ id: data.id });
        if (!user) {
            throw new common_1.BadRequestException(exception_messages_1.MISSING_RECORD);
        }
        if (!user.is_email_confirmed) {
            const token = jwt.sign({
                userId: data.id,
            }, constant_2.TypedEnv.VERIFICATION_TOKEN_SECRET, {
                expiresIn: constant_1.VERIFICATION_TOKEN_EXPIRATION_TIME,
            });
            const mailOptions = {
                from: constant_1.FROM_EMAIL,
                to: user.email,
                subject: constant_1.EMAIL_CONFIRMATION_SUBJECT,
                html: constant_1.CONFIRMATION_EMAIL_HTML +
                    `<a href="${data.host}/confirm-email-request?token=${token}">Confirm email and activate my account</a>`,
            };
            await transporter_1.sendMail(mailOptions);
        }
    }
    async confirmEmail(data) {
        const payload = jwt.verify(data.token, constant_2.TypedEnv.VERIFICATION_TOKEN_SECRET);
        if (!payload) {
            throw new common_1.BadRequestException(exception_messages_1.INVALID_TOKEN);
        }
        const user = await this.accountService.findOne({ id: payload[`userId`] });
        if (!user) {
            throw new common_1.BadRequestException(exception_messages_1.MISSING_RECORD);
        }
        const manager = typeorm_1.getManager();
        await manager.save(Object.assign(user, {
            is_email_confirmed: true,
            email_confirmed_at: new Date().toISOString(),
        }));
        const client = await this.apiClientService.findOne(data.api_client_id);
        const signInData = await this.getSignInResponse(user, client);
        signInData.account = await this.accountService.findOne({ id: user.id });
        return signInData;
    }
    async getSignInResponse(account, client, other = {}) {
        let tokenClient = {};
        if (client) {
            tokenClient = {
                id: client.id,
                name: client.name,
                value: client.value,
                text_value: client.text_value,
            };
        }
        const accountTypeItem = await this.accountTypeService.findById(account.account_type_id);
        const accountType = accountTypeItem ? accountTypeItem.text_value : null;
        const tokenSecret = await this.accountService.changeTokenSecretAndFirebase(account, other.firebase_token);
        const payload = {
            account: {
                id: account.id,
                email: account.email,
            },
            client: tokenClient,
            account_type: accountType,
        };
        if (client.text_value === constant_3.API_CLIENT_TYPE.adroit_driver_android || client.text_value === constant_3.API_CLIENT_TYPE.adroit_driver_ios) {
            if (!other.driver) {
                other.driver = await this.driverService.getExistingDriverByAccountIdOrFail(account.id);
            }
            payload.driver = {
                id: other.driver.id,
            };
        }
        return {
            account_id: account.id,
            token: await this.createToken(payload, tokenSecret),
        };
    }
    async validateUser(accountPayload) {
        if (!accountPayload.account) {
            return false;
        }
        const account = await this.accountService.findByEmail(accountPayload.account.email);
        return !!account;
    }
    async createToken(payload, accountSecret) {
        return jwt.sign(payload, constants_1.GLOBAL_TOKEN_SECRET + accountSecret, { expiresIn: constants_1.EXPIRATION_TIME });
    }
    async decodeToken(token, accountId) {
        const account = await this.accountService.findById(accountId);
        if (!account) {
            throw new common_1.ForbiddenException('Unauthorized');
        }
        const accountSecret = account.token_secret;
        const secret = constants_1.GLOBAL_TOKEN_SECRET + accountSecret;
        return jwt.verify(token, secret);
    }
    async getAccount(login) {
        let isEmail = false;
        if (login.includes('@')) {
            isEmail = true;
            return {
                account: await this.accountService.findByEmail(login),
                isEmail,
            };
        }
        return {
            account: await this.accountService.findByPhoneNumber(login),
            isEmail,
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [account_service_1.AccountService,
        api_client_service_1.ApiClientService,
        sign_in_log_service_1.SignInLogService,
        account_type_service_1.AccountTypeService,
        permission_access_service_1.PermissionAccessService,
        driver_service_1.DriverService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map