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
class CreateAccountDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'Trevor' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "first_name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Noah' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "last_name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'email@domain.com' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '9999999999' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "phone_number", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'https://cdn.goadroit.com/example.jpg' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "picture_url", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: false }),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], CreateAccountDto.prototype, "is_beta_tester", void 0);
exports.CreateAccountDto = CreateAccountDto;
//# sourceMappingURL=create-account.dto.js.map