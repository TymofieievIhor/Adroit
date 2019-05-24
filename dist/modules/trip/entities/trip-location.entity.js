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
const class_validator_1 = require("class-validator");
let TripLocation = class TripLocation extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripLocation.prototype, "type_text_value", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], TripLocation.prototype, "type_name", void 0);
__decorate([
    typeorm_1.Column('float', { nullable: false }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], TripLocation.prototype, "latitude", void 0);
__decorate([
    typeorm_1.Column('float', { nullable: false }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], TripLocation.prototype, "longitude", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 256),
    __metadata("design:type", String)
], TripLocation.prototype, "street1", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(1, 128),
    __metadata("design:type", String)
], TripLocation.prototype, "street2", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 128),
    __metadata("design:type", String)
], TripLocation.prototype, "city", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 64),
    __metadata("design:type", String)
], TripLocation.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: false }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], TripLocation.prototype, "zipcode", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 128),
    __metadata("design:type", String)
], TripLocation.prototype, "country", void 0);
TripLocation = __decorate([
    typeorm_1.Entity('trip_location')
], TripLocation);
exports.TripLocation = TripLocation;
//# sourceMappingURL=trip-location.entity.js.map