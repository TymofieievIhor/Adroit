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
const update_client_simple_dto_1 = require("./update-client-simple.dto");
const update_bank_account_dto_1 = require("../../bank-account/dto/update-bank-account.dto");
const update_location_dto_1 = require("../../location/dto/update-location.dto");
class UpdateClientDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", update_client_simple_dto_1.UpdateClientSimpleDto)
], UpdateClientDto.prototype, "client", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", update_bank_account_dto_1.UpdateBankAccountDto)
], UpdateClientDto.prototype, "bank_account", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", update_location_dto_1.UpdateLocationDto)
], UpdateClientDto.prototype, "location", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], UpdateClientDto.prototype, "contacts", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: [1] }),
    __metadata("design:type", Array)
], UpdateClientDto.prototype, "files", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], UpdateClientDto.prototype, "admins", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], UpdateClientDto.prototype, "contracts", void 0);
exports.UpdateClientDto = UpdateClientDto;
//# sourceMappingURL=update-client.dto.js.map