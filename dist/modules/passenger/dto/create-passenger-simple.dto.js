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
class CreatePassengerSimpleDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'Bob', required: true }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreatePassengerSimpleDto.prototype, "first_name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Nilson', required: true }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreatePassengerSimpleDto.prototype, "last_name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'www.picture.com/myPic' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreatePassengerSimpleDto.prototype, "picture_url", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: (new Date()).toISOString() }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreatePassengerSimpleDto.prototype, "date_of_birth", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 1 }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreatePassengerSimpleDto.prototype, "client_id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: false }),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], CreatePassengerSimpleDto.prototype, "needs_booster_seat", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: false }),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], CreatePassengerSimpleDto.prototype, "needs_car_seat", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: false }),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], CreatePassengerSimpleDto.prototype, "needs_safety_vest", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: false }),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], CreatePassengerSimpleDto.prototype, "needs_monitor", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: false }),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], CreatePassengerSimpleDto.prototype, "needs_wheelchair_assistance", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'instruction' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreatePassengerSimpleDto.prototype, "instructions_note", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: false }),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], CreatePassengerSimpleDto.prototype, "has_been_on_trip", void 0);
exports.CreatePassengerSimpleDto = CreatePassengerSimpleDto;
//# sourceMappingURL=create-passenger-simple.dto.js.map