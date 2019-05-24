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
const ride_blueprint_waypoint_dto_1 = require("./ride-blueprint-waypoint.dto");
const ride_client_adjustment_dto_1 = require("./ride-client-adjustment.dto");
const swagger_1 = require("@nestjs/swagger");
class DaysOfService {
}
exports.DaysOfService = DaysOfService;
class RideBlueprintDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 1 }),
    __metadata("design:type", Number)
], RideBlueprintDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'am' }),
    __metadata("design:type", String)
], RideBlueprintDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: { monday: true }, type: DaysOfService }),
    __metadata("design:type", DaysOfService)
], RideBlueprintDto.prototype, "days_of_service", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'minivan_vehicle' }),
    __metadata("design:type", String)
], RideBlueprintDto.prototype, "type_of_service", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: true }),
    __metadata("design:type", Boolean)
], RideBlueprintDto.prototype, "camera_service_required", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'https://cdn.goadroit.com/example.jpg' }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], RideBlueprintDto.prototype, "map_picture_url", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: ride_client_adjustment_dto_1.RideClientAdjustmentDto, isArray: true }),
    __metadata("design:type", Array)
], RideBlueprintDto.prototype, "client_adjustments", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: ride_blueprint_waypoint_dto_1.RideBlueprintWaypointDto, isArray: true }),
    __metadata("design:type", Array)
], RideBlueprintDto.prototype, "ride_map", void 0);
exports.RideBlueprintDto = RideBlueprintDto;
//# sourceMappingURL=ride-blueprint.dto.js.map