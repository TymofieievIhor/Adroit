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
const service_base_1 = require("../../common/helpers/service.base");
const client_admin_entity_1 = require("./client-admin.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const create_client_admin_dto_1 = require("./dto/create-client-admin.dto");
const account_service_1 = require("../account/account.service");
const account_entity_1 = require("../account/account.entity");
let ClientAdminService = class ClientAdminService extends service_base_1.ServiceBase {
    constructor(repository, accountService) {
        super(client_admin_entity_1.ClientAdmin, repository);
        this.repository = repository;
        this.accountService = accountService;
    }
    async create(data, manager) {
        return await this.createInTxChain(data, manager);
    }
    async createInTxChain(data, manager) {
        const account = await this.accountService.create(Object.assign({}, data, { account_type_id: 10 }), manager);
        const clientAdmin = Object.assign(new client_admin_entity_1.ClientAdmin(), {
            account_id: account.id,
            client_id: data.client_id,
            title: data.title,
        });
        return await manager.save(clientAdmin);
    }
    async updateByIdInTxChain(id, body, manager, owner) {
        const params = {};
        if (owner) {
            params[`${owner.name}_id`] = owner.id;
        }
        const existingClientAdmin = await this.repository.findOne({ id });
        if (existingClientAdmin) {
            await manager.update(client_admin_entity_1.ClientAdmin, { id: existingClientAdmin.id }, Object.assign({}, existingClientAdmin, body, params));
            const account = await this.accountService.findById(existingClientAdmin.account_id);
            await manager.update(account_entity_1.Account, { id: account.id }, Object.assign({}, account, body, params));
            return await this.repository.findOne({ id });
        }
        return await this.createInTxChain(Object.assign(body, params), manager);
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_admin_dto_1.CreateClientAdminDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], ClientAdminService.prototype, "create", null);
ClientAdminService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(client_admin_entity_1.ClientAdmin)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        account_service_1.AccountService])
], ClientAdminService);
exports.ClientAdminService = ClientAdminService;
//# sourceMappingURL=client-admin.service.js.map