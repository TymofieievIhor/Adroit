"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const driver_controller_1 = require("./driver.controller");
const driver_service_1 = require("./driver.service");
const typeorm_1 = require("@nestjs/typeorm");
const driver_entity_1 = require("./driver.entity");
const bank_account_module_1 = require("../bank-account/bank-account.module");
const vehicle_module_1 = require("../vehicle/vehicle.module");
const partner_module_1 = require("../partner/partner.module");
const driver_license_module_1 = require("../driver-license/driver-license.module");
const account_module_1 = require("../account/account.module");
const file_module_1 = require("../file/file.module");
const trip_daily_checklist_entity_1 = require("./trip-daily-checklist.entity");
let DriverModule = class DriverModule {
};
DriverModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([driver_entity_1.Driver]),
            typeorm_1.TypeOrmModule.forFeature([trip_daily_checklist_entity_1.TripDailyChecklist]),
            bank_account_module_1.BankAccountModule,
            vehicle_module_1.VehicleModule,
            partner_module_1.PartnerModule,
            driver_license_module_1.DriverLicenseModule,
            account_module_1.AccountModule,
            file_module_1.FileModule,
        ],
        controllers: [driver_controller_1.DriverController],
        providers: [driver_service_1.DriverService],
        exports: [
            driver_service_1.DriverService,
        ],
    })
], DriverModule);
exports.DriverModule = DriverModule;
//# sourceMappingURL=driver.module.js.map