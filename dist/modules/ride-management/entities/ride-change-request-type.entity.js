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
let RideChangeRequestType = class RideChangeRequestType extends entity_base_1.EntityBase {
    constructor() {
        super(...arguments);
        this.display_in_user_interface = true;
    }
};
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", Number)
], RideChangeRequestType.prototype, "value", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], RideChangeRequestType.prototype, "text_value", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], RideChangeRequestType.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], RideChangeRequestType.prototype, "display_in_user_interface", void 0);
RideChangeRequestType = __decorate([
    typeorm_1.Entity('ride_change_request_type')
], RideChangeRequestType);
exports.RideChangeRequestType = RideChangeRequestType;
//# sourceMappingURL=ride-change-request-type.entity.js.map