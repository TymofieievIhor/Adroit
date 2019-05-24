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
const account_entity_1 = require("../account/account.entity");
const location_entity_1 = require("../location/location.entity");
let Partner = class Partner extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    typeorm_1.OneToOne((type) => account_entity_1.Account),
    typeorm_1.JoinColumn({ name: 'id' }),
    __metadata("design:type", Number)
], Partner.prototype, "owner_account_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 512),
    __metadata("design:type", String)
], Partner.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", Number)
], Partner.prototype, "tin", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    typeorm_1.OneToOne((type) => location_entity_1.LocationEntity),
    typeorm_1.JoinColumn({ name: 'id' }),
    __metadata("design:type", Number)
], Partner.prototype, "location_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Partner.prototype, "bank_account_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Partner.prototype, "is_archived", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], Partner.prototype, "archived_at", void 0);
Partner = __decorate([
    typeorm_1.Entity()
], Partner);
exports.Partner = Partner;
//# sourceMappingURL=partner.entity.js.map