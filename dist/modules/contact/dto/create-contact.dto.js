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
class CreateContactDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'Ben' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "first_name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Fox' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "last_name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'benfox@gmail.com' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '+74839421' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "phone_number", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '123' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "phone_extension", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Accountant' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "title_or_relationship", void 0);
exports.CreateContactDto = CreateContactDto;
//# sourceMappingURL=create-contact.dto.js.map