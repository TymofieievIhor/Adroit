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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const location_service_1 = require("./location.service");
const swagger_1 = require("@nestjs/swagger");
const controller_base_1 = require("../../common/helpers/controller.base");
const create_location_dto_1 = require("./dto/create-location.dto");
const update_location_dto_1 = require("./dto/update-location.dto");
let LocationController = class LocationController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, { create: create_location_dto_1.CreateLocationDto, update: update_location_dto_1.UpdateLocationDto });
        this.service = service;
    }
    async create(body) {
        return await this.service.create(body);
    }
    async updateById(id, body) {
        return await super.updateById(id, body);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create a new location' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateLocationDto]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "create", null);
__decorate([
    common_1.Patch('/:id'),
    swagger_1.ApiOperation({ title: 'Update a location by id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_location_dto_1.UpdateLocationDto]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "updateById", null);
LocationController = __decorate([
    swagger_1.ApiUseTags('location'),
    common_1.Controller('private/location'),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
exports.LocationController = LocationController;
//# sourceMappingURL=location.controller.js.map