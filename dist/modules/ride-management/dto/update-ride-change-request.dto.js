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
exports.BlueprintTypes = BlueprintTypes;
class UpdateRideChangeRequestDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: new Date() }),
    __metadata("design:type", String)
], UpdateRideChangeRequestDto.prototype, "effective_date", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UpdateRideChangeRequestDto.prototype, "place_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UpdateRideChangeRequestDto.prototype, "ride_route_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UpdateRideChangeRequestDto.prototype, "passenger_id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: BlueprintTypes }),
    __metadata("design:type", BlueprintTypes)
], UpdateRideChangeRequestDto.prototype, "blueprint_types", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateRideChangeRequestDto.prototype, "type_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateRideChangeRequestDto.prototype, "note", void 0);
exports.UpdateRideChangeRequestDto = UpdateRideChangeRequestDto;
//# sourceMappingURL=update-ride-change-request.dto.js.map