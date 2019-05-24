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
const entity_base_1 = require("../../common/helpers/entity.base");
let Client = class Client extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Client.prototype, "client_type_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Client.prototype, "phone_number", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "phone_extension", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Client.prototype, "bank_account_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Client.prototype, "owner_account_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Client.prototype, "location_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Client.prototype, "is_archived", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], Client.prototype, "archived_at", void 0);
Client = __decorate([
    typeorm_1.Entity('client')
], Client);
exports.Client = Client;
//# sourceMappingURL=client.entity.js.map