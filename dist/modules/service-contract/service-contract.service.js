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
const service_contract_entity_1 = require("./entities/service-contract.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_contract_pricing_entity_1 = require("./entities/service-contract-pricing.entity");
const constant_1 = require("../../common/helpers/constant");
const service_contract_status_entity_1 = require("./entities/service-contract-status.entity");
const exception_messages_1 = require("../../common/error-handling/exception-messages");
let ServiceContractService = class ServiceContractService extends service_base_1.ServiceBase {
    constructor(repository) {
        super(service_contract_entity_1.ServiceContract, repository);
        this.repository = repository;
    }
    async createInTxChain(data, manager) {
        const existingContracts = await manager.find(service_contract_entity_1.ServiceContract, { client_id: data.client_id });
        if (existingContracts && existingContracts.length) {
            const updatePromises = [];
            for (const c of existingContracts) {
                c.service_contract_status_id = 4;
                updatePromises.push(this.repository.save(c));
            }
            await Promise.all(updatePromises);
        }
        let contract = Object.assign(new service_contract_entity_1.ServiceContract(), data.contract, { service_contract_status_id: 3 }, { client_id: data.client_id });
        contract = await manager.save(contract);
        await manager.save(Object.assign(new service_contract_pricing_entity_1.ServiceContractPricing(), data.pricing, { service_contract_id: contract.id }));
        return contract;
    }
    async updateInTxChain(id, data, manager) {
        let existingContract = await manager.findOne(service_contract_entity_1.ServiceContract, { id, is_deleted: false });
        let newContract;
        if (existingContract) {
            newContract = Object.assign({}, existingContract);
            super.deleteProps(newContract, constant_1.BASE_ENTITY_PROPS);
            await manager.save(Object.assign(existingContract, { service_contract_status_id: 4 }));
        }
        newContract = await manager.save(Object.assign(new service_contract_entity_1.ServiceContract(), { client_id: data.client_id, service_contract_status_id: 3 }, newContract || {}, data.contract || {}));
        const pricing = await manager.findOne(service_contract_pricing_entity_1.ServiceContractPricing, { service_contract_id: existingContract ? existingContract.id : null });
        if (!pricing) {
            await manager.save(Object.assign(new service_contract_pricing_entity_1.ServiceContractPricing(), { service_contract_id: newContract.id }, data.pricing || {}));
        }
        else {
            await manager.save(Object.assign(pricing, { service_contract_id: newContract.id }, data.pricing || {}));
        }
        return newContract;
    }
    async setStatusByIdInTxChain(id, status, manager) {
        const serviceContract = await manager.findOne(service_contract_entity_1.ServiceContract, { id, service_contract_status_id: 3 });
        if (!serviceContract) {
            throw new common_1.BadRequestException(exception_messages_1.MISSING_RECORD);
        }
        const s = await manager.findOne(service_contract_status_entity_1.ServiceContractStatus, { text_value: status.toLowerCase() });
        return s ? manager.save(Object.assign(serviceContract, { service_contract_status_id: s.id })) : serviceContract;
    }
};
ServiceContractService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(service_contract_entity_1.ServiceContract)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiceContractService);
exports.ServiceContractService = ServiceContractService;
//# sourceMappingURL=service-contract.service.js.map