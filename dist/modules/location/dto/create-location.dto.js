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
class CreateLocationDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 123 }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateLocationDto.prototype, "latitude", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 32 }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateLocationDto.prototype, "longitude", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Sumska' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "street1", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Pushkinska' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "street2", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Kyiv' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "city", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'CA' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "state", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 32400 }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateLocationDto.prototype, "zipcode", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'USA' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "country", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'home' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "type", void 0);
exports.CreateLocationDto = CreateLocationDto;
//# sourceMappingURL=create-location.dto.js.map