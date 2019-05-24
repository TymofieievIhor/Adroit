"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const client_controller_1 = require("./client.controller");
const client_service_1 = require("./client.service");
const typeorm_1 = require("@nestjs/typeorm");
const client_entity_1 = require("./client.entity");
const client_type_module_1 = require("../client-type/client-type.module");
const location_module_1 = require("../location/location.module");
const account_module_1 = require("../account/account.module");
const bank_account_module_1 = require("../bank-account/bank-account.module");
const contact_module_1 = require("../contact/contact.module");
const file_module_1 = require("../file/file.module");
const utils_module_1 = require("../../common/utils/utils.module");
const client_admin_module_1 = require("../client-admin/client-admin.module");
const service_contract_module_1 = require("../service-contract/service-contract.module");
const passenger_module_1 = require("../passenger/passenger.module");
let ClientModule = class ClientModule {
};
ClientModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([client_entity_1.Client]),
            client_type_module_1.ClientTypeModule,
            location_module_1.LocationModule,
            account_module_1.AccountModule,
            bank_account_module_1.BankAccountModule,
            contact_module_1.ContactModule,
            file_module_1.FileModule,
            utils_module_1.UtilsModule,
            client_admin_module_1.ClientAdminModule,
            service_contract_module_1.ServiceContractModule,
            passenger_module_1.PassengerModule,
        ],
        controllers: [client_controller_1.ClientController],
        providers: [client_service_1.ClientService],
        exports: [client_service_1.ClientService]
    })
], ClientModule);
exports.ClientModule = ClientModule;
//# sourceMappingURL=client.module.js.map