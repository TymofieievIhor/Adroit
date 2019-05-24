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
class CreateBankAccountDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'John' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "owner_first_name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Doe' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "owner_last_name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'checking' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "bank_account_type", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '478374699811' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "account_number", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '4873627463333' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "routing_number", void 0);
exports.CreateBankAccountDto = CreateBankAccountDto;
//# sourceMappingURL=create-bank-account.dto.js.map