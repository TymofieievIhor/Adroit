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
const entity_base_1 = require("../../../common/helpers/entity.base");
const typeorm_1 = require("typeorm");
let RideBlueprintWaypoint = class RideBlueprintWaypoint extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], RideBlueprintWaypoint.prototype, "ride_blueprint_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], RideBlueprintWaypoint.prototype, "order", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, enum: ['pick_up', 'drop_off'] }),
    __metadata("design:type", String)
], RideBlueprintWaypoint.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideBlueprintWaypoint.prototype, "place_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], RideBlueprintWaypoint.prototype, "distance_from_prior_stop_in_miles", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], RideBlueprintWaypoint.prototype, "distance_from_prior_stop_in_mins", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], RideBlueprintWaypoint.prototype, "distance_from_destination_in_miles", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], RideBlueprintWaypoint.prototype, "distance_from_destination_in_mins", void 0);
__decorate([
    typeorm_1.Column('datetime', { nullable: false }),
    __metadata("design:type", String)
], RideBlueprintWaypoint.prototype, "estimated_arrival_time", void 0);
__decorate([
    typeorm_1.Column('datetime', { nullable: false }),
    __metadata("design:type", String)
], RideBlueprintWaypoint.prototype, "scheduled_arrival_time", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], RideBlueprintWaypoint.prototype, "is_archived", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], RideBlueprintWaypoint.prototype, "archived_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideBlueprintWaypoint.prototype, "archived_by_account_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideBlueprintWaypoint.prototype, "deleted_by_account_id", void 0);
RideBlueprintWaypoint = __decorate([
    typeorm_1.Entity('ride_blueprint_waypoint')
], RideBlueprintWaypoint);
exports.RideBlueprintWaypoint = RideBlueprintWaypoint;
//# sourceMappingURL=ride-blueprint-waypoint.entity.js.map