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
let SignIn = class SignIn {
    constructor() {
        this.created_at = (new Date()).toISOString();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SignIn.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(1, 64),
    __metadata("design:type", String)
], SignIn.prototype, "ip_address", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], SignIn.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], SignIn.prototype, "phone_number", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: true }),
    __metadata("design:type", Boolean)
], SignIn.prototype, "is_success", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], SignIn.prototype, "account_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], SignIn.prototype, "api_client_id", void 0);
__decorate([
    typeorm_1.Column('datetime', { nullable: false, default: new Date() }),
    __metadata("design:type", String)
], SignIn.prototype, "created_at", void 0);
SignIn = __decorate([
    typeorm_1.Entity({ name: 'sign_in' })
], SignIn);
exports.SignIn = SignIn;
//# sourceMappingURL=sign-in.entity.js.map