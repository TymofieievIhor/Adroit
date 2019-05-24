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
const typeorm_1 = require("typeorm");
let TripModification = class TripModification {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TripModification.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], TripModification.prototype, "trip_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], TripModification.prototype, "account_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TripModification.prototype, "account_type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TripModification.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TripModification.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripModification.prototype, "action_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripModification.prototype, "json_new_values", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripModification.prototype, "json_trip_state", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripModification.prototype, "dispatched_at", void 0);
TripModification = __decorate([
    typeorm_1.Entity('trip_modification')
], TripModification);
exports.TripModification = TripModification;
//# sourceMappingURL=trip-modification.entity.js.map