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
let Contact = class Contact extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Contact.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Contact.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Contact.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "phone_number", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "phone_extension", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Contact.prototype, "title_or_relationship", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Contact.prototype, "client_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Contact.prototype, "passenger_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Contact.prototype, "deleted_by_account_id", void 0);
Contact = __decorate([
    typeorm_1.Entity('contact')
], Contact);
exports.Contact = Contact;
//# sourceMappingURL=contact.entity.js.map