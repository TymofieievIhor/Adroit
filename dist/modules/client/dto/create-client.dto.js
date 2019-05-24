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
const create_client_simple_dto_1 = require("./create-client-simple.dto");
const create_bank_account_dto_1 = require("../../bank-account/dto/create-bank-account.dto");
const create_location_dto_1 = require("../../location/dto/create-location.dto");
const create_account_dto_1 = require("../../account/dto/create-account.dto");
const swagger_1 = require("@nestjs/swagger");
const create_service_contract_dto_1 = require("../../service-contract/dto/create-service-contract.dto");
class CreateClientDto {
}
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", create_client_simple_dto_1.CreateClientSimpleDto)
], CreateClientDto.prototype, "client", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", create_bank_account_dto_1.CreateBankAccountDto)
], CreateClientDto.prototype, "bank_account", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", create_location_dto_1.CreateLocationDto)
], CreateClientDto.prototype, "location", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", create_account_dto_1.CreateAccountDto)
], CreateClientDto.prototype, "owner_account", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], CreateClientDto.prototype, "contacts", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: [1] }),
    __metadata("design:type", Array)
], CreateClientDto.prototype, "files", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: false }),
    __metadata("design:type", Array)
], CreateClientDto.prototype, "admins", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, type: create_service_contract_dto_1.CreateServiceContractDto, isArray: true }),
    __metadata("design:type", Array)
], CreateClientDto.prototype, "contracts", void 0);
exports.CreateClientDto = CreateClientDto;
//# sourceMappingURL=create-client.dto.js.map