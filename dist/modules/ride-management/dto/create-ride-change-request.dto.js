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
class BlueprintTypes {
}
__decorate([
    swagger_1.ApiModelProperty({ example: true }),
    __metadata("design:type", Boolean)
], BlueprintTypes.prototype, "am_blueprint", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: false }),
    __metadata("design:type", Boolean)
], BlueprintTypes.prototype, "am_late_start_blueprint", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: false }),
    __metadata("design:type", Boolean)
], BlueprintTypes.prototype, "pm_blueprint", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: false }),
    __metadata("design:type", Boolean)
], BlueprintTypes.prototype, "pm_early_end_blueprint", void 0);
exports.BlueprintTypes = BlueprintTypes;
class CreateRideChangeRequestDto {
}
__decorate([
    swagger_1.ApiModelProperty({ required: true, example: new Date() }),
    __metadata("design:type", String)
], CreateRideChangeRequestDto.prototype, "effective_date", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 1 }),
    __metadata("design:type", Number)
], CreateRideChangeRequestDto.prototype, "place_id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 1 }),
    __metadata("design:type", Number)
], CreateRideChangeRequestDto.prototype, "ride_route_id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 1 }),
    __metadata("design:type", Number)
], CreateRideChangeRequestDto.prototype, "passenger_id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true, type: BlueprintTypes }),
    __metadata("design:type", BlueprintTypes)
], CreateRideChangeRequestDto.prototype, "blueprint_types", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 1, required: true }),
    __metadata("design:type", Number)
], CreateRideChangeRequestDto.prototype, "type_id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'note' }),
    __metadata("design:type", String)
], CreateRideChangeRequestDto.prototype, "note", void 0);
exports.CreateRideChangeRequestDto = CreateRideChangeRequestDto;
//# sourceMappingURL=create-ride-change-request.dto.js.map