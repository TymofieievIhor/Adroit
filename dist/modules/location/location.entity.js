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
const class_validator_1 = require("class-validator");
const entity_base_1 = require("../../common/helpers/entity.base");
let LocationEntity = class LocationEntity extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column('enum', { enum: ['trip_start_point', 'trip_end_point', 'trip_way_point', 'school', 'business', 'home', 'community_center', 'hospital'],
        nullable: false }),
    __metadata("design:type", String)
], LocationEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column('float', { nullable: false }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], LocationEntity.prototype, "latitude", void 0);
__decorate([
    typeorm_1.Column('float', { nullable: false }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], LocationEntity.prototype, "longitude", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 256),
    __metadata("design:type", String)
], LocationEntity.prototype, "street1", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(1, 128),
    __metadata("design:type", String)
], LocationEntity.prototype, "street2", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 128),
    __metadata("design:type", String)
], LocationEntity.prototype, "city", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 64),
    __metadata("design:type", String)
], LocationEntity.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: false }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], LocationEntity.prototype, "zipcode", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 128),
    __metadata("design:type", String)
], LocationEntity.prototype, "country", void 0);
LocationEntity = __decorate([
    typeorm_1.Entity('location')
], LocationEntity);
exports.LocationEntity = LocationEntity;
//# sourceMappingURL=location.entity.js.map