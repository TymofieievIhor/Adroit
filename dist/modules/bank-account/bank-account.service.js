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
const typeorm_1 = require("typeorm");
const bank_account_entity_1 = require("./bank-account.entity");
const typeorm_2 = require("@nestjs/typeorm");
const service_base_1 = require("../../common/helpers/service.base");
const update_bank_account_dto_1 = require("./dto/update-bank-account.dto");
const constant_1 = require("../../common/helpers/constant");
let BankAccountService = class BankAccountService extends service_base_1.ServiceBase {
    constructor(repository) {
        super(bank_account_entity_1.BankAccount, repository);
        this.repository = repository;
    }
    async create(data, manager) {
        return await super.create(data, manager);
    }
    async updateById(id, data, manager) {
        return await this.updateByIdInTxChain(id, data, manager);
    }
    async updateByIdInTxChain(id, data, manager) {
        const bankAccount = await super.checkIfIsDeleted({ id });
        const updatedBankAccount = Object.assign({}, bankAccount, data);
        for (const prop of constant_1.BASE_ENTITY_PROPS) {
            delete updatedBankAccount[prop];
        }
        bankAccount.deleted_at = (new Date()).toISOString();
        bankAccount.is_deleted = true;
        await manager.save(bankAccount);
        return await manager.save(Object.assign(new bank_account_entity_1.BankAccount(), updatedBankAccount));
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_bank_account_dto_1.UpdateBankAccountDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], BankAccountService.prototype, "updateById", null);
BankAccountService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(bank_account_entity_1.BankAccount)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BankAccountService);
exports.BankAccountService = BankAccountService;
//# sourceMappingURL=bank-account.service.js.map