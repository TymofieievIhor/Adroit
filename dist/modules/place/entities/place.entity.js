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
let Place = class Place extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Place.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Place.prototype, "time_zone_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Place.prototype, "phone_number", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "phone_extension", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Place.prototype, "location_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'datetime' }),
    __metadata("design:type", String)
], Place.prototype, "default_start_time", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'datetime' }),
    __metadata("design:type", String)
], Place.prototype, "default_end_time", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'datetime' }),
    __metadata("design:type", String)
], Place.prototype, "default_late_start_time", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'datetime' }),
    __metadata("design:type", String)
], Place.prototype, "default_early_end_time", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Place.prototype, "is_archived", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], Place.prototype, "archived_at", void 0);
Place = __decorate([
    typeorm_1.Entity('place')
], Place);
exports.Place = Place;
//# sourceMappingURL=place.entity.js.map