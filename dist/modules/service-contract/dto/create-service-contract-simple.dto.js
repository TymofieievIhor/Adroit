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
const constrant_1 = require("../../../common/constrant");
class CreateServiceContractSimpleDto {
}
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: constrant_1.api_examples.date }),
    __metadata("design:type", String)
], CreateServiceContractSimpleDto.prototype, "service_start_date", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: constrant_1.api_examples.date }),
    __metadata("design:type", String)
], CreateServiceContractSimpleDto.prototype, "service_end_date", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractSimpleDto.prototype, "no_show_minimum_required_wait_in_mins", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractSimpleDto.prototype, "no_show_invoiced_percentage", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractSimpleDto.prototype, "no_show_payout_percentage", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractSimpleDto.prototype, "advance_cancel_cutoff_in_mins", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractSimpleDto.prototype, "monitor_fee_invoiced_in_increments_of_hrs", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractSimpleDto.prototype, "miles_included_in_invoiced_base_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractSimpleDto.prototype, "miles_included_in_payout_base_fee", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractSimpleDto.prototype, "extra_wait_invoiced_in_increments_of_mins", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: 1 }),
    __metadata("design:type", Number)
], CreateServiceContractSimpleDto.prototype, "extra_wait_payout_in_increments_of_mins", void 0);
exports.CreateServiceContractSimpleDto = CreateServiceContractSimpleDto;
//# sourceMappingURL=create-service-contract-simple.dto.js.map