"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const permission_access_controller_1 = require("./permission-access.controller");
const permission_access_service_1 = require("./permission-access.service");
const typeorm_1 = require("@nestjs/typeorm");
const permission_access_entity_1 = require("./permission-access.entity");
let PermissionAccessModule = class PermissionAccessModule {
};
PermissionAccessModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([permission_access_entity_1.PermissionAccess])],
        controllers: [permission_access_controller_1.PermissionAccessController],
        providers: [permission_access_service_1.PermissionAccessService],
        exports: [permission_access_service_1.PermissionAccessService],
    })
], PermissionAccessModule);
exports.PermissionAccessModule = PermissionAccessModule;
//# sourceMappingURL=permission-access.module.js.map