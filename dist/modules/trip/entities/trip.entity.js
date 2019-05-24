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
const constant_1 = require("../../../common/helpers/constant");
let Trip = class Trip extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false, enum: ['recurring', 'scheduled', 'on_demand'] }),
    __metadata("design:type", String)
], Trip.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Trip.prototype, "ride_route_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Trip.prototype, "ride_blueprint_id", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false,
        enum: Object.values(constant_1.TRIP_STATUSES),
    }),
    __metadata("design:type", String)
], Trip.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'date' }),
    __metadata("design:type", String)
], Trip.prototype, "date_of_service", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, enum: ['sedan_vehicle', 'minivan_vehicle', 'large_vehicle', 'wheelchair_vehicle'] }),
    __metadata("design:type", String)
], Trip.prototype, "type_of_service", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], Trip.prototype, "camera_service_required", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Trip.prototype, "estimated_mileage", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Trip.prototype, "estimated_duration_in_minutes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Trip.prototype, "map_picture_url", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Trip.prototype, "is_test_trip", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Trip.prototype, "is_archived", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], Trip.prototype, "archived_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Trip.prototype, "archived_by_account_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Trip.prototype, "deleted_by_account_id", void 0);
Trip = __decorate([
    typeorm_1.Entity('trip')
], Trip);
exports.Trip = Trip;
//# sourceMappingURL=trip.entity.js.map