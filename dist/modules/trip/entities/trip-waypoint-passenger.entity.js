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
let TripWaypointPassenger = class TripWaypointPassenger extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], TripWaypointPassenger.prototype, "trip_waypoint_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], TripWaypointPassenger.prototype, "trip_passenger_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, enum: ['none', 'picked_up', 'dropped_off', 'no_show', 'canceled_late', 'canceled_in_advance'] }),
    __metadata("design:type", String)
], TripWaypointPassenger.prototype, "status", void 0);
TripWaypointPassenger = __decorate([
    typeorm_1.Entity('trip_waypoint_passenger')
], TripWaypointPassenger);
exports.TripWaypointPassenger = TripWaypointPassenger;
//# sourceMappingURL=trip-waypoint-passenger.entity.js.map