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
let RideBlueprint = class RideBlueprint extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], RideBlueprint.prototype, "ride_route_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RideBlueprint.prototype, "type_text_value", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, enum: ['sedan_vehicle', 'minivan_vehicle', 'large_vehicle', 'wheelchair_vehicle'] }),
    __metadata("design:type", String)
], RideBlueprint.prototype, "type_of_service", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprint.prototype, "camera_service_required", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], RideBlueprint.prototype, "estimated_mileage", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], RideBlueprint.prototype, "estimated_duration_in_minutes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RideBlueprint.prototype, "map_picture_url", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprint.prototype, "recurs_on_monday", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprint.prototype, "recurs_on_tuesday", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprint.prototype, "recurs_on_wednesday", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprint.prototype, "recurs_on_thursday", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprint.prototype, "recurs_on_friday", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprint.prototype, "recurs_on_saturday", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprint.prototype, "recurs_on_sunday", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideBlueprint.prototype, "is_active", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], RideBlueprint.prototype, "is_archived", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], RideBlueprint.prototype, "archived_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideBlueprint.prototype, "archived_by_account_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideBlueprint.prototype, "deleted_by_account_id", void 0);
RideBlueprint = __decorate([
    typeorm_1.Entity('ride_blueprint')
], RideBlueprint);
exports.RideBlueprint = RideBlueprint;
//# sourceMappingURL=ride-blueprint.entity.js.map