"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const client_type_controller_1 = require("./client-type.controller");
const client_type_service_1 = require("./client-type.service");
const typeorm_1 = require("@nestjs/typeorm");
const client_type_entity_1 = require("./client-type.entity");
let ClientTypeModule = class ClientTypeModule {
};
ClientTypeModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([client_type_entity_1.ClientType])],
        controllers: [client_type_controller_1.ClientTypeController],
        providers: [client_type_service_1.ClientTypeService],
        exports: [client_type_service_1.ClientTypeService],
    })
], ClientTypeModule);
exports.ClientTypeModule = ClientTypeModule;
//# sourceMappingURL=client-type.module.js.map