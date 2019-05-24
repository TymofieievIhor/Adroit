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
class RideBlueprintWaypointDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 1 }),
    __metadata("design:type", Number)
], RideBlueprintWaypointDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'pick_up' }),
    __metadata("design:type", String)
], RideBlueprintWaypointDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 1 }),
    __metadata("design:type", Number)
], RideBlueprintWaypointDto.prototype, "place_id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    __metadata("design:type", Number)
], RideBlueprintWaypointDto.prototype, "distance_in_miles", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    __metadata("design:type", Number)
], RideBlueprintWaypointDto.prototype, "distance_in_mins", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: new Date() }),
    __metadata("design:type", String)
], RideBlueprintWaypointDto.prototype, "eta", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: new Date() }),
    __metadata("design:type", String)
], RideBlueprintWaypointDto.prototype, "sta", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], RideBlueprintWaypointDto.prototype, "am_start", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 1, description: 'passenger address' }),
    __metadata("design:type", Number)
], RideBlueprintWaypointDto.prototype, "location_id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: [{ passenger_id: 1, waypoint_passenger_id: 1 }, { passenger_id: 2 }] }),
    __metadata("design:type", Array)
], RideBlueprintWaypointDto.prototype, "waypoint_passengers", void 0);
exports.RideBlueprintWaypointDto = RideBlueprintWaypointDto;
//# sourceMappingURL=ride-blueprint-waypoint.dto.js.map