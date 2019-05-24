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
const create_service_contract_simple_dto_1 = require("./create-service-contract-simple.dto");
const create_service_contract_pricing_simple_dto_1 = require("./create-service-contract-pricing-simple.dto");
const swagger_1 = require("@nestjs/swagger");
class CreateServiceContractDto {
}
__decorate([
    swagger_1.ApiModelProperty({ required: true, type: create_service_contract_simple_dto_1.CreateServiceContractSimpleDto }),
    __metadata("design:type", create_service_contract_simple_dto_1.CreateServiceContractSimpleDto)
], CreateServiceContractDto.prototype, "contract", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, type: create_service_contract_pricing_simple_dto_1.CreateServiceContractPricingSimpleDto }),
    __metadata("design:type", create_service_contract_pricing_simple_dto_1.CreateServiceContractPricingSimpleDto)
], CreateServiceContractDto.prototype, "pricing", void 0);
exports.CreateServiceContractDto = CreateServiceContractDto;
//# sourceMappingURL=create-service-contract.dto.js.map