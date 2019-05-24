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
const uuid = require("uuid4");
class EntityBase {
    constructor() {
        this.uuid = uuid();
        this.created_at = (new Date()).toISOString();
    }
}
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], EntityBase.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true, default: uuid() }),
    __metadata("design:type", String)
], EntityBase.prototype, "uuid", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at' }),
    __metadata("design:type", String)
], EntityBase.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column('datetime', { nullable: false, default: new Date() }),
    __metadata("design:type", String)
], EntityBase.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], EntityBase.prototype, "is_deleted", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", String)
], EntityBase.prototype, "deleted_at", void 0);
exports.EntityBase = EntityBase;
//# sourceMappingURL=entity.base.js.map