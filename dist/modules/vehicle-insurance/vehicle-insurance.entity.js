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
let VehicleInsurance = class VehicleInsurance extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], VehicleInsurance.prototype, "insurance_company_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], VehicleInsurance.prototype, "policy_number", void 0);
__decorate([
    typeorm_1.Column('datetime', { nullable: false }),
    __metadata("design:type", String)
], VehicleInsurance.prototype, "effective_date", void 0);
__decorate([
    typeorm_1.Column('datetime', { nullable: false }),
    __metadata("design:type", String)
], VehicleInsurance.prototype, "expiration_date", void 0);
VehicleInsurance = __decorate([
    typeorm_1.Entity()
], VehicleInsurance);
exports.VehicleInsurance = VehicleInsurance;
//# sourceMappingURL=vehicle-insurance.entity.js.map