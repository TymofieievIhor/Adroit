"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passenger_controller_1 = require("./passenger.controller");
const passenger_service_1 = require("./passenger.service");
const typeorm_1 = require("@nestjs/typeorm");
const passenger_entity_1 = require("./passenger.entity");
const location_module_1 = require("../location/location.module");
const contact_module_1 = require("../contact/contact.module");
const guardian_module_1 = require("../guardian/guardian.module");
const utils_module_1 = require("../../common/utils/utils.module");
let PassengerModule = class PassengerModule {
};
PassengerModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([passenger_entity_1.Passenger]),
            location_module_1.LocationModule,
            contact_module_1.ContactModule,
            guardian_module_1.GuardianModule,
            utils_module_1.UtilsModule,
        ],
        controllers: [passenger_controller_1.PassengerController],
        providers: [passenger_service_1.PassengerService],
        exports: [passenger_service_1.PassengerService],
    })
], PassengerModule);
exports.PassengerModule = PassengerModule;
//# sourceMappingURL=passenger.module.js.map