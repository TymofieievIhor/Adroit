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
const partner_entity_1 = require("../partner/partner.entity");
const bank_account_entity_1 = require("../bank-account/bank-account.entity");
const driver_license_entity_1 = require("../driver-license/driver-license.entity");
const account_entity_1 = require("../account/account.entity");
let Driver = class Driver extends entity_base_1.EntityBase {
    constructor() {
        super(...arguments);
        this.has_serviced_trips = false;
        this.is_suspended = false;
    }
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Driver.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Driver.prototype, "partner_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Driver.prototype, "account_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", Number)
], Driver.prototype, "ssn", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Driver.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column('date', { nullable: false }),
    __metadata("design:type", String)
], Driver.prototype, "date_of_birth", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Driver.prototype, "driver_license_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Driver.prototype, "bank_account_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], Driver.prototype, "has_serviced_trips", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], Driver.prototype, "is_suspended", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], Driver.prototype, "suspended_at", void 0);
__decorate([
    typeorm_1.OneToOne(type => partner_entity_1.Partner),
    typeorm_1.JoinColumn({ name: 'partner_id' }),
    __metadata("design:type", partner_entity_1.Partner)
], Driver.prototype, "partner", void 0);
__decorate([
    typeorm_1.OneToOne(type => bank_account_entity_1.BankAccount),
    typeorm_1.JoinColumn({ name: 'id' }),
    __metadata("design:type", bank_account_entity_1.BankAccount)
], Driver.prototype, "bank_account", void 0);
__decorate([
    typeorm_1.OneToOne(type => driver_license_entity_1.DriverLicense),
    typeorm_1.JoinColumn({ name: 'id' }),
    __metadata("design:type", driver_license_entity_1.DriverLicense)
], Driver.prototype, "driver_license", void 0);
__decorate([
    typeorm_1.OneToOne(type => account_entity_1.Account),
    typeorm_1.JoinColumn({ name: 'id' }),
    __metadata("design:type", account_entity_1.Account)
], Driver.prototype, "account", void 0);
Driver = __decorate([
    typeorm_1.Entity()
], Driver);
exports.Driver = Driver;
//# sourceMappingURL=driver.entity.js.map