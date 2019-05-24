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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const controller_base_1 = require("../../common/helpers/controller.base");
const create_vehicle_insurance_dto_1 = require("./dto/create-vehicle-insurance.dto");
const vehicle_insurance_service_1 = require("./vehicle-insurance.service");
const update_vehicle_insurance_dto_1 = require("./dto/update-vehicle-insurance.dto");
const swagger_1 = require("@nestjs/swagger");
let VehicleInsuranceController = class VehicleInsuranceController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, { create: create_vehicle_insurance_dto_1.CreateVehicleInsuranceDto, update: update_vehicle_insurance_dto_1.UpdateVehicleInsuranceDto });
        this.service = service;
    }
};
VehicleInsuranceController = __decorate([
    swagger_1.ApiUseTags('vehicle-insurance'),
    common_1.Controller('/private/vehicle-insurance'),
    __metadata("design:paramtypes", [vehicle_insurance_service_1.VehicleInsuranceService])
], VehicleInsuranceController);
exports.VehicleInsuranceController = VehicleInsuranceController;
//# sourceMappingURL=vehicle-insurance.controller.js.map