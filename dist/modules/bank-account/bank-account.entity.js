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
let BankAccount = class BankAccount extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 256),
    __metadata("design:type", String)
], BankAccount.prototype, "owner_first_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 256),
    __metadata("design:type", String)
], BankAccount.prototype, "owner_last_name", void 0);
__decorate([
    typeorm_1.Column('enum', { nullable: false, enum: ['checking', 'savings'] }),
    __metadata("design:type", String)
], BankAccount.prototype, "bank_account_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 17),
    __metadata("design:type", String)
], BankAccount.prototype, "account_number", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 17),
    __metadata("design:type", String)
], BankAccount.prototype, "routing_number", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BankAccount.prototype, "partner_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BankAccount.prototype, "driver_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BankAccount.prototype, "client_id", void 0);
BankAccount = __decorate([
    typeorm_1.Entity({ name: 'bank_account' })
], BankAccount);
exports.BankAccount = BankAccount;
//# sourceMappingURL=bank-account.entity.js.map