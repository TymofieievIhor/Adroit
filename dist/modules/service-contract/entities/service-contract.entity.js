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
let ServiceContract = class ServiceContract extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "client_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "service_contract_status_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ServiceContract.prototype, "service_start_date", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ServiceContract.prototype, "service_end_date", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "no_show_minimum_required_wait_in_mins", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "no_show_invoiced_percentage", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "no_show_payout_percentage", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "advance_cancel_cutoff_in_mins", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "monitor_fee_invoiced_in_increments_of_hrs", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "miles_included_in_invoiced_base_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "miles_included_in_payout_base_fee", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "extra_wait_invoiced_in_increments_of_mins", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "extra_wait_payout_in_increments_of_mins", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ServiceContract.prototype, "deleted_by_account_id", void 0);
ServiceContract = __decorate([
    typeorm_1.Entity('service_contract')
], ServiceContract);
exports.ServiceContract = ServiceContract;
//# sourceMappingURL=service-contract.entity.js.map