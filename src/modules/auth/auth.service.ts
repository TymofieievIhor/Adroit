import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { IAccountTokenPayload, IClientTokenData } from '../../common/helpers/auth/tokenPayload.interface';
import * as jwt from 'jsonwebtoken';
import { AccountService } from '../account/account.service';
import { ApiClientService } from '../api-client/api-client.service';
import {
    EXPIRATION_TIME,
    GLOBAL_TOKEN_SECRET,
    MAX_SIGN_IN_ATTEMPTS,
    MAX_SIGN_IN_INTERVAL_MINUTES,
} from '../../common/helpers/auth/constants';
import { SignInLogService } from '../sign-in-log/sign-in-log.service';
import { SignIn } from '../sign-in-log/sign-in.entity';
import { Account } from '../account/account.entity';
import { AccountTypeService } from '../account-type/account-type.service';
import {
    INVALID_TOKEN, MISSING_RECORD,
    SIGN_IN_EXCEED_ATTEMPTS_MSG, SIGN_IN_CRED_MISMATCH_MSG,
} from '../../common/error-handling/exception-messages';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { ApiClient } from '../api-client/api-client.entity';
import { SendConfirmationEmailDto } from './dto/send-confirmation-email.dto';
import {
    CONFIRMATION_EMAIL_HTML,
    EMAIL_CONFIRMATION_SUBJECT,
    FROM_EMAIL,
    VERIFICATION_TOKEN_EXPIRATION_TIME,
    EXC_PERMISSION_ACCESS_ERROR,
} from '../../common/helpers/constant';
import { TypedEnv } from '../../common/env/constant';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { getManager } from 'typeorm';
import { extractIpAddress } from '../../common/helpers/function';
import {sendMail} from '../../common/mailer/transporter';
import {PermissionAccessService} from '../permission-access/permission-access.service';
import { DriverService } from '../driver/driver.service';
import { API_CLIENT_TYPE } from '../api-client/constant';
import { Driver } from '../driver/driver.entity';

@Injectable()
export class AuthService {

    constructor(
        private accountService: AccountService,
        private apiClientService: ApiClientService,
        private signInLogService: SignInLogService,
        private accountTypeService: AccountTypeService,
        private permissionAccess: PermissionAccessService,
        private driverService: DriverService,
    ) {

    }

    async signIn(data: SignInDto, req): Promise<SignInResponseDto> {
        const signInIsAllowed = await this.signInLogService.checkIfSignInIsAllowed(data.login, MAX_SIGN_IN_INTERVAL_MINUTES, MAX_SIGN_IN_ATTEMPTS);
        if (!signInIsAllowed) {
            throw new ForbiddenException(SIGN_IN_EXCEED_ATTEMPTS_MSG);
        }
        const { account, isEmail } = await this.getAccount(data.login);

        const client = await this.apiClientService.findOne({value: data.api_client_id});
        if (!client) {
            throw new NotFoundException('client not found');
        }
        const signInRec: SignIn = Object.assign(new SignIn(), {
                        email: account ? account.email : isEmail ? data.login : null,
                        phone_number: account ? account.phone_number : !isEmail ? data.login : null,
                        ip_address: extractIpAddress(req),
                        account_id: account ? account.id : null,
                        api_client_id: client.id,
                    });
        if (!account || account.is_deleted || account.is_blocked) {
            signInRec.is_success = false;
            await this.signInLogService.create(signInRec);
            throw new ForbiddenException(SIGN_IN_CRED_MISMATCH_MSG);
        }
        if (!await this.permissionAccess.findOne({
            account_type: account.account_type_id,
            api_client: client.value,
            is_deleted: false,
        })) {
            signInRec.is_success = false;
            await this.signInLogService.create(signInRec);
            throw new NotFoundException(EXC_PERMISSION_ACCESS_ERROR);
        }
        const passCheck = AccountService.comparePasswordSync(data.password, account.password_hash);
        if (!passCheck) {
            signInRec.is_success = false;
            await this.signInLogService.create(signInRec);
            throw new ForbiddenException(SIGN_IN_CRED_MISMATCH_MSG);
        }
        let driver: Driver;
        if (client.text_value === API_CLIENT_TYPE.adroit_driver_android || client.text_value === API_CLIENT_TYPE.adroit_driver_ios) {
          driver = await this.driverService.getExistingDriverByAccountIdOrFail(account.id);
        }
        signInRec.is_success = true;
        await this.signInLogService.create(signInRec);
        return await this.getSignInResponse(account, client, { firebase_token: data.firebase_token, driver });
    }

    async sendConfirmationEmail(data: SendConfirmationEmailDto): Promise<void> {
        const user = await this.accountService.findOne({ id: data.id });

        if (!user) {
            throw new BadRequestException(MISSING_RECORD);
        }
        if (!user.is_email_confirmed) {

            const token = jwt.sign({
                    userId: data.id,
                },
                TypedEnv.VERIFICATION_TOKEN_SECRET,
                {
                    expiresIn: VERIFICATION_TOKEN_EXPIRATION_TIME,
                });
            const mailOptions = {
                from: FROM_EMAIL,
                to: user.email,
                subject: EMAIL_CONFIRMATION_SUBJECT,
                html: CONFIRMATION_EMAIL_HTML +
                    `<a href="${data.host}/confirm-email-request?token=${token}">Confirm email and activate my account</a>`,
            };

            await sendMail(mailOptions);
        }
    }

    async confirmEmail(data: ConfirmEmailDto): Promise<SignInResponseDto> {
        const payload = jwt.verify(data.token, TypedEnv.VERIFICATION_TOKEN_SECRET);

        if (!payload) {
            throw new BadRequestException(INVALID_TOKEN);
        }

        const user = await this.accountService.findOne({ id: payload[`userId`] });

        if (!user) {
            throw new BadRequestException(MISSING_RECORD);
        }
        const manager = getManager();
        await manager.save(Object.assign(user, {
            is_email_confirmed: true,
            email_confirmed_at: new Date().toISOString(),
        }));

        const client = await this.apiClientService.findOne(data.api_client_id);
        const signInData = await this.getSignInResponse(user, client);
        signInData.account = await this.accountService.findOne({ id: user.id });
        return signInData;
    }

    async getSignInResponse(account: Account, client?: ApiClient, other: {
      firebase_token?: string,
      driver?: Driver,
    } = {}): Promise<SignInResponseDto> {
      let tokenClient: IClientTokenData = {};
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
            } as IAccountTokenPayload;
      if (client.text_value === API_CLIENT_TYPE.adroit_driver_android || client.text_value === API_CLIENT_TYPE.adroit_driver_ios){
          if (!other.driver) {
            other.driver = await this.driverService.getExistingDriverByAccountIdOrFail(account.id);
          }
          payload.driver = {
                id: other.driver.id,
            };
      }
      return {
        account_id: account.id,
        token: await this.createToken( payload, tokenSecret),
      };
    }

    async validateUser(accountPayload: IAccountTokenPayload) {
        if (!accountPayload.account) {
            return false;
        }
        const account = await this.accountService.findByEmail(accountPayload.account.email);
        return !!account;
    }

    async createToken(payload: IAccountTokenPayload, accountSecret: string) {
        return jwt.sign(payload, GLOBAL_TOKEN_SECRET + accountSecret, { expiresIn: EXPIRATION_TIME });
    }

    async decodeToken(token: string, accountId: number) {
        const account: Account = await this.accountService.findById(accountId);
        if (!account) {
            throw new ForbiddenException('Unauthorized');
        }
        const accountSecret: string = account.token_secret;
        const secret: string = GLOBAL_TOKEN_SECRET + accountSecret;
        return jwt.verify(token, secret);
    }

    private async getAccount(login: string): Promise<{account: Account, isEmail: boolean}> {
        let isEmail: boolean = false;
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
}
