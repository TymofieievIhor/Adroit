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
let RideRoute = class RideRoute extends entity_base_1.EntityBase {
    constructor() {
        super(...arguments);
        this.has_am = false;
        this.has_am_late_start = false;
        this.has_pm = false;
        this.has_pm_early_return = false;
        this.is_recurring = true;
        this.is_active = true;
    }
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideRoute.prototype, "has_am", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideRoute.prototype, "has_am_late_start", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideRoute.prototype, "has_pm", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideRoute.prototype, "has_pm_early_return", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideRoute.prototype, "is_recurring", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideRoute.prototype, "is_active", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], RideRoute.prototype, "is_archived", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], RideRoute.prototype, "archived_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideRoute.prototype, "archived_by_account_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RideRoute.prototype, "deleted_by_account_id", void 0);
RideRoute = __decorate([
    typeorm_1.Entity('ride_route')
], RideRoute);
exports.RideRoute = RideRoute;
//# sourceMappingURL=ride-route.entity.js.map