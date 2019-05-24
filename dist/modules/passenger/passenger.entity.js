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
const entity_base_1 = require("../../common/helpers/entity.base");
const typeorm_1 = require("typeorm");
let Passenger = class Passenger extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Passenger.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Passenger.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Passenger.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Passenger.prototype, "picture_url", void 0);
__decorate([
    typeorm_1.Column('date', { nullable: false }),
    __metadata("design:type", String)
], Passenger.prototype, "date_of_birth", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Passenger.prototype, "client_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], Passenger.prototype, "needs_booster_seat", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], Passenger.prototype, "needs_car_seat", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], Passenger.prototype, "needs_safety_vest", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], Passenger.prototype, "needs_monitor", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], Passenger.prototype, "needs_wheelchair_assistance", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Passenger.prototype, "instructions_note", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], Passenger.prototype, "has_been_on_trip", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Passenger.prototype, "is_archived", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], Passenger.prototype, "archived_at", void 0);
Passenger = __decorate([
    typeorm_1.Entity('passenger')
], Passenger);
exports.Passenger = Passenger;
//# sourceMappingURL=passenger.entity.js.map