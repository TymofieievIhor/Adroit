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
const vehicle_entity_1 = require("./vehicle.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const create_vehicle_dto_1 = require("./dto/create-vehicle.dto");
const vehicle_insurance_service_1 = require("../vehicle-insurance/vehicle-insurance.service");
const update_vehicle_dto_1 = require("./dto/update-vehicle.dto");
const vehicle_insurance_entity_1 = require("../vehicle-insurance/vehicle-insurance.entity");
const exception_messages_1 = require("../../common/error-handling/exception-messages");
let VehicleService = class VehicleService extends service_base_1.ServiceBase {
    constructor(repository, vehicleInsuranceService) {
        super(vehicle_entity_1.Vehicle, repository);
        this.repository = repository;
        this.vehicleInsuranceService = vehicleInsuranceService;
    }
    async create(data, manager) {
        return await this.createInTxChain(data, manager);
    }
    async createInTxChain(data, manager, driverId) {
        const vehicleInsurance = await this.vehicleInsuranceService.create(data.vehicle_insurance, manager);
        let vehicle = Object.assign(new vehicle_entity_1.Vehicle(), data.vehicle, { driver_id: driverId });
        vehicle.vehicle_insurance_id = vehicleInsurance.id;
        vehicle = await manager.save(vehicle_entity_1.Vehicle, vehicle);
        vehicle.vehicle_insurance = vehicleInsurance;
        return vehicle;
    }
    async updateById(id, data, manager) {
        return await this.updateByIdInTxChain(id, data, manager);
    }
    async updateByIdInTxChain(id, data, manager) {
        let vehicle = await manager.findOne(vehicle_entity_1.Vehicle, { id });
        if (!vehicle) {
            throw new common_1.BadRequestException(exception_messages_1.MISSING_RECORD);
        }
        let vehicleInsurance = await manager.findOne(vehicle_insurance_entity_1.VehicleInsurance, vehicle.vehicle_insurance_id);
        if (data.vehicle_insurance) {
            vehicleInsurance = await this.vehicleInsuranceService.updateByIdInTxChain(vehicleInsurance.id, data.vehicle_insurance, manager);
        }
        if (data.vehicle) {
            vehicle = await manager.save(vehicle_entity_1.Vehicle, Object.assign(vehicle, data.vehicle));
        }
        vehicle.vehicle_insurance = vehicleInsurance;
        return vehicle;
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vehicle_dto_1.CreateVehicleDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], VehicleService.prototype, "create", null);
__decorate([
    typeorm_1.Transaction(),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_vehicle_dto_1.UpdateVehicleDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], VehicleService.prototype, "updateById", null);
VehicleService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        vehicle_insurance_service_1.VehicleInsuranceService])
], VehicleService);
exports.VehicleService = VehicleService;
//# sourceMappingURL=vehicle.service.js.map