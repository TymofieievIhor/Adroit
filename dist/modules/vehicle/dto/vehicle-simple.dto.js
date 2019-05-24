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
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class VehicleSimpleDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'Nissan' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], VehicleSimpleDto.prototype, "make", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Leaf' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], VehicleSimpleDto.prototype, "model", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Sedan' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], VehicleSimpleDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 2018 }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], VehicleSimpleDto.prototype, "year", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'black' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], VehicleSimpleDto.prototype, "color", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'F43K435' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], VehicleSimpleDto.prototype, "license_plate", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: (new Date()).toISOString() }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], VehicleSimpleDto.prototype, "registration_expiry_date", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 123234345 }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], VehicleSimpleDto.prototype, "vin", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: './example.jpg' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], VehicleSimpleDto.prototype, "picture_url", void 0);
exports.VehicleSimpleDto = VehicleSimpleDto;
//# sourceMappingURL=vehicle-simple.dto.js.map