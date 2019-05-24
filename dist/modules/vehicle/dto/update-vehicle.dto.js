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
const swagger_1 = require("@nestjs/swagger");
const update_vehicle_simple_dto_1 = require("./update-vehicle-simple.dto");
const update_vehicle_insurance_dto_1 = require("../../vehicle-insurance/dto/update-vehicle-insurance.dto");
const class_validator_1 = require("class-validator");
class UpdateVehicleDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", update_vehicle_simple_dto_1.UpdateVehicleSimpleDto)
], UpdateVehicleDto.prototype, "vehicle", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", update_vehicle_insurance_dto_1.UpdateVehicleInsuranceDto)
], UpdateVehicleDto.prototype, "vehicle_insurance", void 0);
exports.UpdateVehicleDto = UpdateVehicleDto;
//# sourceMappingURL=update-vehicle.dto.js.map