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
let ServiceContractPricing = class ServiceContractPricing extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "service_contract_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "invoiced_additional_mile_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "payout_additional_mile_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "invoiced_base_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "payout_base_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "invoiced_minivan_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "payout_minivan_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "invoiced_large_vehicle_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "payout_large_vehicle_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "invoiced_wheelchair_vehicle_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "payout_wheelchair_vehicle_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "invoiced_camera_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "payout_camera_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "invoiced_seating_equipment_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "payout_seating_equipment_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "invoiced_waiting_time_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "payout_waiting_time_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "invoiced_monitor_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContractPricing.prototype, "payout_monitor_fee", void 0);
ServiceContractPricing = __decorate([
    typeorm_1.Entity('service_contract_pricing')
], ServiceContractPricing);
exports.ServiceContractPricing = ServiceContractPricing;
//# sourceMappingURL=service-contract-pricing.entity.js.map