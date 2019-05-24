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
const swagger_1 = require("@nestjs/swagger");
const basic_pagination_dto_1 = require("../../common/helpers/basic-pagination.dto");
const controller_base_1 = require("../../common/helpers/controller.base");
const trip_service_1 = require("./trip.service");
const find_trip_params_dto_1 = require("./dto/find-trip-params.dto");
const constrant_1 = require("../../common/constrant");
const constants_1 = require("../../common/helpers/auth/constants");
let TripController = class TripController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, {
            create: class {
            },
        });
        this.service = service;
    }
    async find(params, pagination) {
        return await this.service.find(params, pagination);
    }
    async getCompletedHistory(req, countDay, pagination) {
        return await this.service.getCompletedTripsHistory(req[constants_1.REQUEST_PROPERTY_TOKEN].driver, req[constants_1.REQUEST_PROPERTY_TOKEN].client, countDay, pagination);
    }
    async getNextTrip(req) {
        return await this.service.getNextUpcomingTrip(req[constants_1.REQUEST_PROPERTY_TOKEN].driver, req[constants_1.REQUEST_PROPERTY_TOKEN].client);
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Get all trips' }),
    swagger_1.ApiImplicitQuery({
        name: 'type',
        description: 'AM or PM',
        required: true,
        type: String,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'date_of_service',
        description: 'e.g. ' + constrant_1.api_examples.date,
        required: true,
        type: String,
    }),
    swagger_1.ApiImplicitQuery({
        name: 'search',
        description: 'search by Trip #, Route #, Blueprint, Place name, Client name, Time, Status, Driver name, Passenger name',
        required: false,
        type: String,
    }),
    __param(0, common_1.Query()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_trip_params_dto_1.FindTripParamsDto, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "find", null);
__decorate([
    common_1.Get('my-trips'),
    swagger_1.ApiOperation({ title: 'Get history of trips. Work only driver apps' }),
    swagger_1.ApiImplicitQuery({
        name: 'days_limit',
        type: Number,
        required: false,
    }),
    __param(0, common_1.Req()), __param(1, common_1.Query('days_limit')), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "getCompletedHistory", null);
__decorate([
    common_1.Get('my-trips/next-upcoming-today'),
    swagger_1.ApiOperation({ title: 'Get next upcoming trip. Work only driver apps' }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "getNextTrip", null);
TripController = __decorate([
    swagger_1.ApiUseTags('trip'),
    common_1.Controller('private/trip'),
    __metadata("design:paramtypes", [trip_service_1.TripService])
], TripController);
exports.TripController = TripController;
//# sourceMappingURL=trip.controller.js.map