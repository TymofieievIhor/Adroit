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
let TripPassenger = class TripPassenger extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], TripPassenger.prototype, "passenger_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], TripPassenger.prototype, "trip_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripPassenger.prototype, "type_text_value", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripPassenger.prototype, "type_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripPassenger.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripPassenger.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripPassenger.prototype, "picture_url", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], TripPassenger.prototype, "needs_booster_seat", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], TripPassenger.prototype, "needs_car_seat", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], TripPassenger.prototype, "needs_safety_vest", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], TripPassenger.prototype, "needs_monitor", void 0);
TripPassenger = __decorate([
    typeorm_1.Entity('trip_passenger')
], TripPassenger);
exports.TripPassenger = TripPassenger;
//# sourceMappingURL=trip-passenger.entity.js.map