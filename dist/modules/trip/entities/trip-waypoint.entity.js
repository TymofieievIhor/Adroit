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
let TripWaypoint = class TripWaypoint extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], TripWaypoint.prototype, "trip_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], TripWaypoint.prototype, "order", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, enum: ['pick_up', 'drop_off'] }),
    __metadata("design:type", String)
], TripWaypoint.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripWaypoint.prototype, "scheduled_arrival_time", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], TripWaypoint.prototype, "scheduled_arrival_trip_location_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, enum: ['none', 'enroute', 'arrived', 'skipped', 'completed'] }),
    __metadata("design:type", String)
], TripWaypoint.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TripWaypoint.prototype, "arrival_time", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], TripWaypoint.prototype, "arrival_trip_location_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TripWaypoint.prototype, "no_show_time", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], TripWaypoint.prototype, "no_show_trip_location_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TripWaypoint.prototype, "pick_up_time", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], TripWaypoint.prototype, "pick_up_trip_location_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TripWaypoint.prototype, "drop_off_time", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], TripWaypoint.prototype, "drop_off_trip_location_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], TripWaypoint.prototype, "additional_waiting_time", void 0);
TripWaypoint = __decorate([
    typeorm_1.Entity('trip_waypoint')
], TripWaypoint);
exports.TripWaypoint = TripWaypoint;
//# sourceMappingURL=trip-waypoint.entity.js.map