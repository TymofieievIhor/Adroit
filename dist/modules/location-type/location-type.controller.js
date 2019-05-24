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
const swagger_1 = require("@nestjs/swagger");
const location_type_service_1 = require("./location-type.service");
const controller_base_1 = require("../../common/helpers/controller.base");
const create_location_type_dto_1 = require("./dto/create-location-type.dto");
const update_location_dto_1 = require("../location/dto/update-location.dto");
let LocationTypeController = class LocationTypeController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, { create: create_location_type_dto_1.CreateLocationTypeDto, update: update_location_dto_1.UpdateLocationDto });
        this.service = service;
    }
};
LocationTypeController = __decorate([
    swagger_1.ApiUseTags('location-type'),
    common_1.Controller('private/location-type'),
    __metadata("design:paramtypes", [location_type_service_1.LocationTypeService])
], LocationTypeController);
exports.LocationTypeController = LocationTypeController;
//# sourceMappingURL=location-type.controller.js.map