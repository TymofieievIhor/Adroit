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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AccountService_1;
const common_1 = require("@nestjs/common");
const service_base_1 = require("../../common/helpers/service.base");
const account_entity_1 = require("./account.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const constants_1 = require("../../common/helpers/auth/constants");
const account_type_entity_1 = require("../account-type/account-type.entity");
const exception_messages_1 = require("../../common/error-handling/exception-messages");
const custom_error_1 = require("../../common/error-handling/custom-error");
const constant_1 = require("./constant");
const function_1 = require("../../common/helpers/function");
const constant_2 = require("../../common/helpers/constant");
const transporter_1 = require("../../common/mailer/transporter");
const function_2 = require("../../common/helpers/auth/function");
let AccountService = AccountService_1 = class AccountService extends service_base_1.ServiceBase {
    constructor(repository) {
        super(account_entity_1.Account, repository);
        this.repository = repository;
    }
    async findByEmail(email) {
        return await this.repository.findOne({ email });
    }
    async findByPhoneNumber(phoneNumber) {
        return await this.repository.findOne({ phone_number: phoneNumber });
    }
    async find(params, pagination) {
        const customFindWithRelations = this.findWithRelations('t');
        if (params && params.search) {
            if (!isNaN(+params.search)) {
                customFindWithRelations
                    .andWhere(`t.id = :id`, { id: +params.search })
                    .orWhere(`t.phone_number LIKE '%${+params.search}%'`);
            }
            else {
                customFindWithRelations
                    .andWhere(`account_type.name LIKE '%${params.search}%'`)
                    .orWhere(`t.phone_number LIKE '%${+params.search}%'`)
                    .orWhere(`t.first_name LIKE '%${params.search}%'`)
                    .orWhere(`t.last_name LIKE '%${params.search}%'`)
                    .orWhere(`t.email LIKE '%${params.search}%'`);
            }
        }
        return super.find(params, pagination, () => customFindWithRelations, 't');
    }
    async updatePassword(id, { old_password, new_password }) {
        const account = await this.repository.findOneOrFail({ id });
        if (old_password === new_password) {
            throw new common_1.BadRequestException(constant_1.EXC_NEW_PASSWORD_THE_SAME);
        }
        if (!AccountService_1.comparePasswordSync(old_password, account.password_hash)) {
            throw new common_1.BadRequestException(constant_1.EXC_ACCOUNT_OLD_PASSWORD_MISMATCH);
        }
        if (!function_2.isPasswordSecureEnough(new_password)) {
            throw new common_1.BadRequestException(constant_1.EXC_NEW_PASSWORD_NOT_SECURE);
        }
        account.password_hash = await this.createPasswordHash(new_password);
        return this.repository.save(account);
    }
    async resetPassword(id) {
        const account = await this.repository.findOneOrFail({ id });
        await this.repository.save(Object.assign(account, {
            password_hash: await this.createPasswordHash(constant_2.DEFAULT_PASSWORD),
            is_temporary_password: true,
        }));
        const mailOptions = {
            from: constant_2.FROM_EMAIL,
            to: account.email,
            subject: constant_2.RESET_PASSWORD_EMAIL_SUBJECT,
            html: constant_2.RESET_PASSWORD_EMAIL_HTML,
        };
        try {
            await transporter_1.sendMail(mailOptions);
            return await this.findWithRelations('t').getOne();
        }
        catch (e) {
            return e;
        }
    }
    async create(data, manager) {
        try {
            manager = manager || this.repository;
            if (data.email) {
                data.email = data.email.toLowerCase();
            }
            await this.checkForTheDuplicates(data.email, data.phone_number);
            const account = Object.assign(new account_entity_1.Account(), data);
            if (!data.account_type_id) {
                account.account_type_id = 2;
            }
            account.password_hash = await this.createPasswordHash(constant_2.DEFAULT_PASSWORD);
            account.token_secret = this.generateTokenSecret();
            return await manager.save(account);
        }
        catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                if (err.message.includes('phone_number')) {
                    throw new Error(exception_messages_1.DUPLICATE_ENTRY_PHONE_NUM);
                }
                else if (err.message.includes('email')) {
                    throw new Error(exception_messages_1.DUPLICATE_ENTRY_EMAIL);
                }
            }
            else {
                throw new Error(err);
            }
        }
    }
    async updateById(id, body) {
        let account = await this.getExistingAccountsQuery({ id }).getOne();
        if (!account) {
            throw new common_1.BadRequestException(constant_1.EXC_ACCOUNT_NOT_EXISTS);
        }
        if (body.email) {
            body.email = body.email.toLowerCase();
        }
        await this.checkForTheDuplicates(body.email, body.phone_number, account.id);
        account = Object.assign(account, body);
        if (body.password && account.is_temporary_password) {
            account.password_hash = await this.createPasswordHash(body.password);
            account.is_temporary_password = false;
        }
        return await this.repository.save(account);
    }
    async acceptTos(id, req) {
        const account = await this.getExistingAccountsQuery({ id }).getOne();
        if (!account) {
            throw new common_1.BadRequestException(constant_1.EXC_ACCOUNT_NOT_EXISTS);
        }
        account.tos_accepted_at = new Date().toJSON();
        if (req) {
            account.tos_acceptance_ip = function_1.extractIpAddress(req);
        }
        return await this.repository.save(account);
    }
    async setBlockStatusById(id, body) {
        const q = this.getExistingAccountsQuery({ id });
        const account = await q.getOne();
        if (!account) {
            throw new common_1.BadRequestException('Account\'s block status cannot be changed');
        }
        const updateData = body.block
            ?
                { is_blocked: true, blocked_at: (new Date()).toISOString() }
            :
                { is_blocked: false, blocked_at: null };
        return await this.repository.save(Object.assign(account, updateData));
    }
    async findById(id) {
        const q = this.getExistingAccountsQuery({ id });
        return await q.getOne();
    }
    async createPasswordHash(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    generateTokenSecret() {
        return crypto.randomBytes(constants_1.RANDOM_BYTES_SIZE).toString('hex');
    }
    findWithRelations(alias, qb) {
        const q = qb ? qb : this.repository.createQueryBuilder(alias);
        return q
            .leftJoinAndMapOne(`${alias}.account_type`, account_type_entity_1.AccountType, 'account_type', `account_type.id = ${alias}.account_type_id`)
            .where(`${alias}.is_deleted != true`);
    }
    getExistingAccountsQuery(params) {
        return this.repository
            .createQueryBuilder('t')
            .where(params || {})
            .andWhere('t.is_blocked != true')
            .andWhere('t.is_deleted != true');
    }
    async checkForTheDuplicates(email, phoneNum, id) {
        const q = this.repository.createQueryBuilder('t')
            .where('t.email = :email AND t.is_deleted != true', { email });
        if (id) {
            q.andWhere('t.id != :id', { id });
        }
        const duplicates = await q.getMany();
        if (duplicates && duplicates.length) {
            throw new custom_error_1.CustomError('ER_DUP_ENTRY', 'email');
        }
    }
    async changeTokenSecretAndFirebase(account, firebase_token) {
        account.token_secret = this.generateTokenSecret();
        if (firebase_token) {
            account.firebase_token = firebase_token;
        }
        const account_id = account.id;
        await this.repository.save(account);
        account.id = account_id;
        return account.token_secret;
    }
    static comparePasswordSync(password, password_hash) {
        return bcrypt.compareSync(password, password_hash);
    }
};
AccountService = AccountService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map