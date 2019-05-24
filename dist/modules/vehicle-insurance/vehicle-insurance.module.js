"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const vehicle_insurance_service_1 = require("./vehicle-insurance.service");
const vehicle_insurance_controller_1 = require("./vehicle-insurance.controller");
const vehicle_insurance_entity_1 = require("./vehicle-insurance.entity");
const typeorm_1 = require("@nestjs/typeorm");
let VehicleInsuranceModule = class VehicleInsuranceModule {
};
VehicleInsuranceModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([vehicle_insurance_entity_1.VehicleInsurance]),
        ],
        providers: [vehicle_insurance_service_1.VehicleInsuranceService],
        controllers: [vehicle_insurance_controller_1.VehicleInsuranceController],
        exports: [
            vehicle_insurance_service_1.VehicleInsuranceService,
        ],
    })
], VehicleInsuranceModule);
exports.VehicleInsuranceModule = VehicleInsuranceModule;
//# sourceMappingURL=vehicle-insurance.module.js.map