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
const vehicle_insurance_entity_1 = require("./vehicle-insurance.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const update_vehicle_insurance_dto_1 = require("./dto/update-vehicle-insurance.dto");
let VehicleInsuranceService = class VehicleInsuranceService extends service_base_1.ServiceBase {
    constructor(repository) {
        super(vehicle_insurance_entity_1.VehicleInsurance, repository);
        this.repository = repository;
    }
    async updateById(id, data, manager) {
        return await this.updateByIdInTxChain(id, data, manager);
    }
    async updateByIdInTxChain(id, data, manager) {
        const vehicleInsurance = await manager.findOneOrFail(vehicle_insurance_entity_1.VehicleInsurance, id);
        if (vehicleInsurance.is_deleted) {
            throw new common_1.BadRequestException('The record cannot be updated');
        }
        return manager.save(vehicle_insurance_entity_1.VehicleInsurance, Object.assign(vehicleInsurance, data));
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_vehicle_insurance_dto_1.UpdateVehicleInsuranceDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], VehicleInsuranceService.prototype, "updateById", null);
VehicleInsuranceService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(vehicle_insurance_entity_1.VehicleInsurance)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], VehicleInsuranceService);
exports.VehicleInsuranceService = VehicleInsuranceService;
//# sourceMappingURL=vehicle-insurance.service.js.map