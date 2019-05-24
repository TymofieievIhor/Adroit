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
class UpdateSimpleDriverDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 1 }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateSimpleDriverDto.prototype, "partner_id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 123123123 }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UpdateSimpleDriverDto.prototype, "ssn", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'male' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateSimpleDriverDto.prototype, "gender", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: (new Date()).toISOString() }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateSimpleDriverDto.prototype, "date_of_birth", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: false }),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateSimpleDriverDto.prototype, "has_services_trips", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: false }),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateSimpleDriverDto.prototype, "is_suspended", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: (new Date()).toISOString() }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateSimpleDriverDto.prototype, "suspended_at", void 0);
exports.UpdateSimpleDriverDto = UpdateSimpleDriverDto;
//# sourceMappingURL=update-simple-driver.dto.js.map