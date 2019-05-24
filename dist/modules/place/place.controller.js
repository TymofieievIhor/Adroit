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
const controller_base_1 = require("../../common/helpers/controller.base");
const place_service_1 = require("./place.service");
const create_place_dto_1 = require("./dto/create-place.dto");
const swagger_1 = require("@nestjs/swagger");
const basic_pagination_dto_1 = require("../../common/helpers/basic-pagination.dto");
const find_place_params_dto_1 = require("./dto/find-place-params.dto");
const set_archived_status_dto_1 = require("../client/dto/set-archived-status.dto");
let PlaceController = class PlaceController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, { create: create_place_dto_1.CreatePlaceDto });
        this.service = service;
    }
    async create(body) {
        return await super.create(body);
    }
    async find(params, pagination) {
        return await super.find(params, pagination);
    }
    async setArchiveDStatus(id, body) {
        await this.service.setArchivedStatusById(id, body);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create a new place' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_place_dto_1.CreatePlaceDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "create", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Get all places' }),
    swagger_1.ApiImplicitQuery({
        name: 'name',
        description: 'filter by name',
        required: false,
        type: String,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'time_zone',
        description: 'filter by time_zone (abbreviation)',
        required: false,
        type: String,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'phone_number',
        description: 'filter by phone_number',
        required: false,
        type: String,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'country',
        description: 'filter by country',
        required: false,
        type: String,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'state',
        description: 'filter by state',
        required: false,
        type: String,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'zipcode',
        description: 'filter by zipcode',
        required: false,
        type: Number,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'city',
        description: 'filter by city',
        required: false,
        type: String,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'latitude',
        description: 'filter by latitude',
        required: false,
        type: Number,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'longitude',
        description: 'filter by longitude',
        required: false,
        type: Number,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'street',
        description: 'filter by street',
        required: false,
        type: String,
    }),
    __param(0, common_1.Query()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_place_params_dto_1.FindPlaceParamsDto, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "find", null);
__decorate([
    common_1.Post('/set-archived-status/:id'),
    swagger_1.ApiOperation({ title: 'Archive/unarchive a place' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, set_archived_status_dto_1.SetArchivedStatusDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "setArchiveDStatus", null);
PlaceController = __decorate([
    swagger_1.ApiUseTags('place'),
    common_1.Controller('private/place'),
    __metadata("design:paramtypes", [place_service_1.PlaceService])
], PlaceController);
exports.PlaceController = PlaceController;
//# sourceMappingURL=place.controller.js.map