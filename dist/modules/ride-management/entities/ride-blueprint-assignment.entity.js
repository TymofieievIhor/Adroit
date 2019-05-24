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
let RideBlueprintAssignment = class RideBlueprintAssignment extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], RideBlueprintAssignment.prototype, "ride_blueprint_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], RideBlueprintAssignment.prototype, "service_start_date", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], RideBlueprintAssignment.prototype, "service_end_date", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprintAssignment.prototype, "recurs_on_monday", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprintAssignment.prototype, "recurs_on_tuesday", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprintAssignment.prototype, "recurs_on_wednesday", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprintAssignment.prototype, "recurs_on_thursday", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprintAssignment.prototype, "recurs_on_friday", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprintAssignment.prototype, "recurs_on_saturday", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprintAssignment.prototype, "recurs_on_sunday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideBlueprintAssignment.prototype, "monday_driver_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideBlueprintAssignment.prototype, "tuesday_driver_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideBlueprintAssignment.prototype, "wednesday_driver_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideBlueprintAssignment.prototype, "thursday_driver_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideBlueprintAssignment.prototype, "friday_driver_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideBlueprintAssignment.prototype, "saturday_driver_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideBlueprintAssignment.prototype, "sunday_driver_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], RideBlueprintAssignment.prototype, "is_archived", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], RideBlueprintAssignment.prototype, "archived_at", void 0);
RideBlueprintAssignment = __decorate([
    typeorm_1.Entity('ride_blueprint_assignment')
], RideBlueprintAssignment);
exports.RideBlueprintAssignment = RideBlueprintAssignment;
//# sourceMappingURL=ride-blueprint-assignment.entity.js.map