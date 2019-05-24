"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const account_type_service_1 = require("./account-type.service");
const account_type_controller_1 = require("./account-type.controller");
const account_type_entity_1 = require("./account-type.entity");
let AccountTypeModule = class AccountTypeModule {
};
AccountTypeModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([account_type_entity_1.AccountType]),
        ],
        providers: [
            account_type_service_1.AccountTypeService,
        ],
        controllers: [
            account_type_controller_1.AccountTypeController,
        ],
        exports: [
            account_type_service_1.AccountTypeService,
        ],
    })
], AccountTypeModule);
exports.AccountTypeModule = AccountTypeModule;
//# sourceMappingURL=account-type.module.js.map