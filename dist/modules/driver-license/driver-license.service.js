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
const driver_license_entity_1 = require("./driver-license.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const create_driver_license_dto_1 = require("./dto/create-driver-license.dto");
const location_service_1 = require("../location/location.service");
const update_driver_license_dto_1 = require("./dto/update-driver-license.dto");
const exception_messages_1 = require("../../common/error-handling/exception-messages");
let DriverLicenseService = class DriverLicenseService extends service_base_1.ServiceBase {
    constructor(repository, locationService) {
        super(driver_license_entity_1.DriverLicense, repository);
        this.repository = repository;
        this.locationService = locationService;
    }
    async create(data, manager) {
        return await this.createInTxChain(data, manager);
    }
    async createInTxChain(data, manager) {
        const location = await this.locationService.create(data.location);
        let driverLicense = Object.assign(new driver_license_entity_1.DriverLicense(), data.driver_license);
        driverLicense.location_id = location.id;
        driverLicense = await manager.save(driverLicense);
        driverLicense.location = location;
        return driverLicense;
    }
    async updateById(id, data, manager) {
        return await this.updateByIdInTxChain(id, data, manager);
    }
    async updateByIdInTxChain(id, data, manager) {
        let driverLicense = await manager.findOne(driver_license_entity_1.DriverLicense, { id });
        if (!driverLicense) {
            throw new common_1.BadRequestException(exception_messages_1.MISSING_RECORD);
        }
        let location;
        if (data.location && Object.keys(data.location).length) {
            location = await this.locationService.updateByIdNoLink(driverLicense.location_id, data.location, manager);
            driverLicense.location_id = location.id;
        }
        if (data.driver_license && Object.keys(data.driver_license).length) {
            driverLicense = Object.assign(driverLicense, data.driver_license);
        }
        await manager.save(driver_license_entity_1.DriverLicense, Object.assign(new driver_license_entity_1.DriverLicense(), driverLicense));
        driverLicense.location = location || {};
        return driverLicense;
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_driver_license_dto_1.CreateDriverLicenseDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], DriverLicenseService.prototype, "create", null);
__decorate([
    typeorm_1.Transaction(),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_driver_license_dto_1.UpdateDriverLicenseDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], DriverLicenseService.prototype, "updateById", null);
DriverLicenseService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(driver_license_entity_1.DriverLicense)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        location_service_1.LocationService])
], DriverLicenseService);
exports.DriverLicenseService = DriverLicenseService;
//# sourceMappingURL=driver-license.service.js.map