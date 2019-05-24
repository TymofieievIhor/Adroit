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
class CreateServiceContractPricingSimpleDto {
}
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "invoiced_additional_mile_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "payout_additional_mile_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "invoiced_base_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "payout_base_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "invoiced_minivan_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "payout_minivan_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "invoiced_large_vehicle_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "payout_large_vehicle_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "invoiced_wheelchair_vehicle_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "payout_wheelchair_vehicle_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "invoiced_camera_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "payout_camera_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "invoiced_seating_equipment_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "payout_seating_equipment_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "invoiced_waiting_time_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "payout_waiting_time_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "invoiced_monitor_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractPricingSimpleDto.prototype, "payout_monitor_fee", void 0);
exports.CreateServiceContractPricingSimpleDto = CreateServiceContractPricingSimpleDto;
//# sourceMappingURL=create-service-contract-pricing-simple.dto.js.map