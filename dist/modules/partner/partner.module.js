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
const partner_entity_1 = require("./partner.entity");
const partner_service_1 = require("./partner.service");
const partner_controller_1 = require("./partner.controller");
const location_module_1 = require("../location/location.module");
const account_module_1 = require("../account/account.module");
const bank_account_module_1 = require("../bank-account/bank-account.module");
const file_module_1 = require("../file/file.module");
const utils_module_1 = require("../../common/utils/utils.module");
let PartnerModule = class PartnerModule {
};
PartnerModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([partner_entity_1.Partner]),
            location_module_1.LocationModule,
            account_module_1.AccountModule,
            bank_account_module_1.BankAccountModule,
            file_module_1.FileModule,
            utils_module_1.UtilsModule,
        ],
        providers: [
            partner_service_1.PartnerService,
        ],
        controllers: [
            partner_controller_1.PartnerController,
        ],
        exports: [
            partner_service_1.PartnerService,
        ],
    })
], PartnerModule);
exports.PartnerModule = PartnerModule;
//# sourceMappingURL=partner.module.js.map