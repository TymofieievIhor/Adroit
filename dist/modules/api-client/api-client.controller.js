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
const api_client_service_1 = require("./api-client.service");
const swagger_1 = require("@nestjs/swagger");
const create_api_client_dto_1 = require("./dto/create-api-client.dto");
const update_api_client_dto_1 = require("./dto/update-api-client.dto");
let ApiClientController = class ApiClientController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, { create: create_api_client_dto_1.CreateApiClientDto, update: update_api_client_dto_1.UpdateApiClientDto });
        this.service = service;
    }
};
ApiClientController = __decorate([
    swagger_1.ApiUseTags('api-client'),
    common_1.Controller('private/api-client'),
    __metadata("design:paramtypes", [api_client_service_1.ApiClientService])
], ApiClientController);
exports.ApiClientController = ApiClientController;
//# sourceMappingURL=api-client.controller.js.map