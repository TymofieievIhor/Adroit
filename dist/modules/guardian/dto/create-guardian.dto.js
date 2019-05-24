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
class CreateGuardianDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'Alex' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateGuardianDto.prototype, "first_name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Green' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateGuardianDto.prototype, "last_name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'alexgreen@gmail.com' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateGuardianDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '+12839421' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateGuardianDto.prototype, "phone_number", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Mother' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateGuardianDto.prototype, "relationship", void 0);
exports.CreateGuardianDto = CreateGuardianDto;
//# sourceMappingURL=create-guardian.dto.js.map