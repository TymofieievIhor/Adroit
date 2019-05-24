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
const entity_base_1 = require("../../../common/helpers/entity.base");
const class_validator_1 = require("class-validator");
let ServiceContractStatus = class ServiceContractStatus extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", Number)
], ServiceContractStatus.prototype, "value", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 64),
    __metadata("design:type", String)
], ServiceContractStatus.prototype, "text_value", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(1, 64),
    __metadata("design:type", String)
], ServiceContractStatus.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: true }),
    __metadata("design:type", Boolean)
], ServiceContractStatus.prototype, "display_in_user_interface", void 0);
ServiceContractStatus = __decorate([
    typeorm_1.Entity('service_contract_status')
], ServiceContractStatus);
exports.ServiceContractStatus = ServiceContractStatus;
//# sourceMappingURL=service-contract-status.entity.js.map