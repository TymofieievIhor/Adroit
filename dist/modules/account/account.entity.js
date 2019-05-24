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
const account_type_entity_1 = require("../account-type/account-type.entity");
let Account = class Account extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    typeorm_1.OneToOne((type) => account_type_entity_1.AccountType),
    typeorm_1.JoinColumn({ name: 'id' }),
    __metadata("design:type", Number)
], Account.prototype, "account_type_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 128),
    __metadata("design:type", String)
], Account.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 128),
    __metadata("design:type", String)
], Account.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Account.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Account.prototype, "phone_number", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 1024),
    __metadata("design:type", String)
], Account.prototype, "password_hash", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: true }),
    __metadata("design:type", Boolean)
], Account.prototype, "is_temporary_password", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 1024),
    __metadata("design:type", String)
], Account.prototype, "token_secret", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Account.prototype, "firebase_token", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Account.prototype, "picture_url", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Account.prototype, "is_email_confirmed", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], Account.prototype, "email_confirmed_at", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(1, 64),
    __metadata("design:type", String)
], Account.prototype, "tos_acceptance_ip", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], Account.prototype, "tos_accepted_at", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Account.prototype, "is_beta_tester", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Account.prototype, "is_blocked", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], Account.prototype, "blocked_at", void 0);
Account = __decorate([
    typeorm_1.Entity()
], Account);
exports.Account = Account;
//# sourceMappingURL=account.entity.js.map