"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const account_module_1 = require("./modules/account/account.module");
const account_type_module_1 = require("./modules/account-type/account-type.module");
const typeorm_1 = require("@nestjs/typeorm");
const api_client_module_1 = require("./modules/api-client/api-client.module");
const sign_in_log_module_1 = require("./modules/sign-in-log/sign-in-log.module");
const partner_module_1 = require("./modules/partner/partner.module");
const location_module_1 = require("./modules/location/location.module");
const location_type_module_1 = require("./modules/location-type/location-type.module");
const bank_account_module_1 = require("./modules/bank-account/bank-account.module");
const auth_module_1 = require("./modules/auth/auth.module");
const constant_1 = require("./common/env/constant");
const driver_module_1 = require("./modules/driver/driver.module");
const driver_license_module_1 = require("./modules/driver-license/driver-license.module");
const vehicle_module_1 = require("./modules/vehicle/vehicle.module");
const vehicle_insurance_module_1 = require("./modules/vehicle-insurance/vehicle-insurance.module");
const file_module_1 = require("./modules/file/file.module");
const client_module_1 = require("./modules/client/client.module");
const client_type_module_1 = require("./modules/client-type/client-type.module");
const contact_module_1 = require("./modules/contact/contact.module");
const trip_module_1 = require("./modules/trip/trip.module");
const place_module_1 = require("./modules/place/place.module");
const passenger_module_1 = require("./modules/passenger/passenger.module");
const utils_module_1 = require("./common/utils/utils.module");
const time_zone_module_1 = require("./modules/time-zone/time-zone.module");
const client_admin_module_1 = require("./modules/client-admin/client-admin.module");
const service_contract_module_1 = require("./modules/service-contract/service-contract.module");
const ride_management_module_1 = require("./modules/ride-management/ride-management.module");
const permission_access_module_1 = require("./modules/permission-access/permission-access.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                port: 3306,
                host: constant_1.TypedEnv.DB_HOST,
                username: constant_1.TypedEnv.DB_USERNAME,
                password: constant_1.TypedEnv.DB_PASSWORD,
                database: constant_1.TypedEnv.DB_NAME,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                timezone: 'Z',
                supportBigNumbers: true,
                bigNumberStrings: false,
            }),
            account_module_1.AccountModule,
            account_type_module_1.AccountTypeModule,
            api_client_module_1.ApiClientModule,
            sign_in_log_module_1.SignInLogModule,
            partner_module_1.PartnerModule,
            location_module_1.LocationModule,
            location_type_module_1.LocationTypeModule,
            bank_account_module_1.BankAccountModule,
            auth_module_1.AuthModule,
            driver_module_1.DriverModule,
            driver_license_module_1.DriverLicenseModule,
            vehicle_module_1.VehicleModule,
            vehicle_insurance_module_1.VehicleInsuranceModule,
            file_module_1.FileModule,
            client_module_1.ClientModule,
            client_type_module_1.ClientTypeModule,
            contact_module_1.ContactModule,
            trip_module_1.TripModule,
            place_module_1.PlaceModule,
            passenger_module_1.PassengerModule,
            utils_module_1.UtilsModule,
            time_zone_module_1.TimeZoneModule,
            client_admin_module_1.ClientAdminModule,
            service_contract_module_1.ServiceContractModule,
            ride_management_module_1.RideManagementModule,
            trip_module_1.TripModule,
            permission_access_module_1.PermissionAccessModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map