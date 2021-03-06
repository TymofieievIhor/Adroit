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
const class_validator_1 = require("class-validator");
class UpdateSimpleDriverLicenseDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'KL1231' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateSimpleDriverLicenseDto.prototype, "number", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: (new Date()).toISOString() }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateSimpleDriverLicenseDto.prototype, "date_of_expiration", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'NY' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateSimpleDriverLicenseDto.prototype, "issued_by_state", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateSimpleDriverLicenseDto.prototype, "weight_in_pounds", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateSimpleDriverLicenseDto.prototype, "height_in_feet", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateSimpleDriverLicenseDto.prototype, "height_in_inches", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'black' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateSimpleDriverLicenseDto.prototype, "hair_color", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'brown' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateSimpleDriverLicenseDto.prototype, "eye_color", void 0);
exports.UpdateSimpleDriverLicenseDto = UpdateSimpleDriverLicenseDto;
//# sourceMappingURL=update-simple-driver-license.dto.js.map