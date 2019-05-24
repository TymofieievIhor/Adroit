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
let RideChangeRequest = class RideChangeRequest extends entity_base_1.EntityBase {
};
__decorate([
    typeorm_1.Column('date', { nullable: false }),
    __metadata("design:type", String)
], RideChangeRequest.prototype, "effective_date", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], RideChangeRequest.prototype, "ride_change_request_type_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideChangeRequest.prototype, "ride_route_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideChangeRequest.prototype, "place_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideChangeRequest.prototype, "passenger_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideChangeRequest.prototype, "apply_to_am_blueprint", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideChangeRequest.prototype, "apply_to_am_late_start_blueprint", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideChangeRequest.prototype, "apply_to_pm_blueprint", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideChangeRequest.prototype, "apply_to_pm_early_end_blueprint", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RideChangeRequest.prototype, "note", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideChangeRequest.prototype, "deleted_by_account_id", void 0);
RideChangeRequest = __decorate([
    typeorm_1.Entity('ride_change_request')
], RideChangeRequest);
exports.RideChangeRequest = RideChangeRequest;
//# sourceMappingURL=ride-change-request.entity.js.map