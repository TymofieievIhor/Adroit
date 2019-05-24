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
const create_location_dto_1 = require("../../location/dto/create-location.dto");
const simple_partner_dto_1 = require("./simple-partner.dto");
const create_account_dto_1 = require("../../account/dto/create-account.dto");
const create_bank_account_dto_1 = require("../../bank-account/dto/create-bank-account.dto");
class CreatePartnerDto {
}
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", simple_partner_dto_1.SimplePartnerDto)
], CreatePartnerDto.prototype, "partner", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", create_location_dto_1.CreateLocationDto)
], CreatePartnerDto.prototype, "location", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", create_account_dto_1.CreateAccountDto)
], CreatePartnerDto.prototype, "owner_account", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", create_bank_account_dto_1.CreateBankAccountDto)
], CreatePartnerDto.prototype, "bank_account", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: [1], required: false }),
    __metadata("design:type", Array)
], CreatePartnerDto.prototype, "files", void 0);
exports.CreatePartnerDto = CreatePartnerDto;
//# sourceMappingURL=create-partner.dto.js.map