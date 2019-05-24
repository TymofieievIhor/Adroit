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
const common_1 = require("@nestjs/common");
const controller_base_1 = require("../../common/helpers/controller.base");
const client_type_service_1 = require("./client-type.service");
const create_client_type_dto_1 = require("./dto/create-client-type.dto");
const swagger_1 = require("@nestjs/swagger");
let ClientTypeController = class ClientTypeController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, { create: create_client_type_dto_1.CreateClientTypeDto });
        this.service = service;
    }
};
ClientTypeController = __decorate([
    swagger_1.ApiUseTags('client-type'),
    common_1.Controller('private/client-type'),
    __metadata("design:paramtypes", [client_type_service_1.ClientTypeService])
], ClientTypeController);
exports.ClientTypeController = ClientTypeController;
//# sourceMappingURL=client-type.controller.js.map