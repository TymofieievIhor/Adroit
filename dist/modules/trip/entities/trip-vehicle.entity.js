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
let TripVehicle = class TripVehicle extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], TripVehicle.prototype, "vehicle_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], TripVehicle.prototype, "trip_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripVehicle.prototype, "license_plate", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripVehicle.prototype, "make", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripVehicle.prototype, "model", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripVehicle.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripVehicle.prototype, "color", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TripVehicle.prototype, "picture_url", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], TripVehicle.prototype, "is_switched", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], TripVehicle.prototype, "switched_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], TripVehicle.prototype, "switched_by_account_id", void 0);
TripVehicle = __decorate([
    typeorm_1.Entity('trip_vehicle')
], TripVehicle);
exports.TripVehicle = TripVehicle;
//# sourceMappingURL=trip-vehicle.entity.js.map