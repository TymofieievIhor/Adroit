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
class UpdateLocationDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 12 }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateLocationDto.prototype, "latitude", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 22 }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateLocationDto.prototype, "longitude", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Bank Ave' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "street1", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Bank Ave 2' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "street2", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'New York' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "city", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'NY' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "state", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 1231 }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateLocationDto.prototype, "zipcode", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'USA' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "country", void 0);
exports.UpdateLocationDto = UpdateLocationDto;
//# sourceMappingURL=update-location.dto.js.map