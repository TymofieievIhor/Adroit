"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const passport = require("passport");
const jwt_strategy_1 = require("./jwt.strategy");
const account_module_1 = require("../account/account.module");
const api_client_module_1 = require("../api-client/api-client.module");
const sign_in_log_module_1 = require("../sign-in-log/sign-in-log.module");
const account_type_module_1 = require("../account-type/account-type.module");
const permission_access_module_1 = require("../permission-access/permission-access.module");
const driver_module_1 = require("../driver/driver.module");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes({ path: '/private/*', method: common_1.RequestMethod.ALL });
    }
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            account_module_1.AccountModule,
            api_client_module_1.ApiClientModule,
            sign_in_log_module_1.SignInLogModule,
            account_type_module_1.AccountTypeModule,
            permission_access_module_1.PermissionAccessModule,
            driver_module_1.DriverModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
        ],
        exports: [
            auth_service_1.AuthService,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map