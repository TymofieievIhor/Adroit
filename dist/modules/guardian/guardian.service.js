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
const common_1 = require("@nestjs/common");
const guardian_entity_1 = require("./guardian.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const account_service_1 = require("../account/account.service");
const account_entity_1 = require("../account/account.entity");
const service_base_1 = require("../../common/helpers/service.base");
let GuardianService = class GuardianService extends service_base_1.ServiceBase {
    constructor(repository, accountService) {
        super(guardian_entity_1.Guardian, repository);
        this.repository = repository;
        this.accountService = accountService;
    }
    async createInTxChain(data, manager) {
        const guardianAccount = await this.accountService.create(Object.assign(data, { account_type_id: 11 }), manager);
        return await manager.save(Object.assign(new guardian_entity_1.Guardian(), { account_id: guardianAccount.id, passenger_id: data.passenger_id, relationship: data.relationship }));
    }
    async updateByIdInTxChain(id, body, manager, owner) {
        const params = {};
        if (owner) {
            params[`${owner.name}_id`] = owner.id;
        }
        const existingGuardian = await this.repository.findOne({ id });
        if (existingGuardian) {
            await this.repository.update({ id: existingGuardian.id }, Object.assign(existingGuardian, body, params));
            return await this.repository.findOne({ id });
        }
        return await this.createInTxChain(Object.assign(body, params), manager);
    }
    async findById(id) {
        return await super.findById(id, () => this.findWithRelations('t'));
    }
    async find(data, pagination) {
        return await super.find(data, pagination, () => this.findWithRelations('t'));
    }
    findWithRelations(alias) {
        return this.repository.createQueryBuilder(alias)
            .leftJoinAndMapOne(`${alias}.account`, account_entity_1.Account, 'account', `account.id = ${alias}.account_id AND account.is_deleted != true`)
            .where(`${alias}.is_deleted != true`);
    }
};
GuardianService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(guardian_entity_1.Guardian)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        account_service_1.AccountService])
], GuardianService);
exports.GuardianService = GuardianService;
//# sourceMappingURL=guardian.service.js.map