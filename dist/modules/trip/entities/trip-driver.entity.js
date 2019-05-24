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
let TripDriver = class TripDriver extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], TripDriver.prototype, "driver_account_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], TripDriver.prototype, "driver_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], TripDriver.prototype, "trip_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripDriver.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripDriver.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripDriver.prototype, "phone_number", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TripDriver.prototype, "picture_url", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripDriver.prototype, "driver_email", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripDriver.prototype, "partner_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], TripDriver.prototype, "partner_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], TripDriver.prototype, "is_switched", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], TripDriver.prototype, "switched_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], TripDriver.prototype, "switched_by_account_id", void 0);
TripDriver = __decorate([
    typeorm_1.Entity('trip_driver')
], TripDriver);
exports.TripDriver = TripDriver;
//# sourceMappingURL=trip-driver.entity.js.map