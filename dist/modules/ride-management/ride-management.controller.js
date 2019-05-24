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
const create_ride_route_dto_1 = require("./dto/create-ride-route.dto");
const ride_management_service_1 = require("./ride-management.service");
const swagger_1 = require("@nestjs/swagger");
const create_blueprint_assignment_dto_1 = require("./dto/create-blueprint-assignment.dto");
const basic_pagination_dto_1 = require("../../common/helpers/basic-pagination.dto");
const ride_change_request_find_params_dto_1 = require("./dto/ride-change-request-find-params.dto");
const create_ride_change_request_dto_1 = require("./dto/create-ride-change-request.dto");
const update_ride_change_request_dto_1 = require("./dto/update-ride-change-request.dto");
const find_ride_route_params_dto_1 = require("./dto/find-ride-route-params.dto");
const update_ride_route_dto_1 = require("./dto/update-ride-route.dto");
let RideManagementController = class RideManagementController extends controller_base_1.ControllerBase {
    constructor(service) {
        super(service, { create: create_ride_route_dto_1.CreateRideRouteDto });
        this.service = service;
    }
    async create(body) {
        return await this.service.create(body);
    }
    async createBlueprintAssignment(route_id, blueprint_id, body) {
        return await this.service.createBlueprintAssignment(route_id, blueprint_id, body);
    }
    async find(params, pagination) {
        return await this.service.getRideManagementList(params, pagination);
    }
    async getBlueprintInfo(blueprintId) {
        return await this.service.getRideInfo(blueprintId);
    }
    async findRouteById(routeId) {
        return await this.service.getRouteById(routeId);
    }
    async updateById(id, body) {
        return await this.service.updateRideRouteById(id, body);
    }
    async findChangeRequests(params) {
        return await this.service.findChangeRequest(params);
    }
    async createChangeRequest(body) {
        return await this.service.createChangeRequest(body);
    }
    async updateChangeRequest(id, body) {
        return await this.service.updateChangeRequest(id, body);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create a new ride route' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ride_route_dto_1.CreateRideRouteDto]),
    __metadata("design:returntype", Promise)
], RideManagementController.prototype, "create", null);
__decorate([
    common_1.Post('/routes/:route_id/blueprints/:blueprint_id/assignment'),
    swagger_1.ApiOperation({ title: 'Create a blueprint assignment' }),
    swagger_1.ApiImplicitParam({ name: 'route_id', type: Number }),
    swagger_1.ApiImplicitParam({ name: 'blueprint_id', type: Number }),
    __param(0, common_1.Param('route_id')), __param(1, common_1.Param('blueprint_id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_blueprint_assignment_dto_1.CreateBlueprintAssignmentDto]),
    __metadata("design:returntype", Promise)
], RideManagementController.prototype, "createBlueprintAssignment", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'Get a ride-management list' }),
    __param(0, common_1.Query()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_ride_route_params_dto_1.FindRideRouteParamsDto, basic_pagination_dto_1.BasicPaginationDto]),
    __metadata("design:returntype", Promise)
], RideManagementController.prototype, "find", null);
__decorate([
    common_1.Get('/blueprint/:blueprintId'),
    swagger_1.ApiOperation({ title: 'Get a blueprint route list' }),
    __param(0, common_1.Param('blueprintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RideManagementController.prototype, "getBlueprintInfo", null);
__decorate([
    common_1.Get('/route/:routeId'),
    swagger_1.ApiOperation({ title: 'Find a route by id' }),
    __param(0, common_1.Param('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RideManagementController.prototype, "findRouteById", null);
__decorate([
    common_1.Patch('/:id'),
    swagger_1.ApiOperation({ title: 'Update a ride route by id' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_ride_route_dto_1.UpdateRideRouteDto]),
    __metadata("design:returntype", Promise)
], RideManagementController.prototype, "updateById", null);
__decorate([
    common_1.Get('/change-requests'),
    swagger_1.ApiOperation({ title: 'Get ride-management change requests' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ride_change_request_find_params_dto_1.RideChangeRequestFindParamsDto]),
    __metadata("design:returntype", Promise)
], RideManagementController.prototype, "findChangeRequests", null);
__decorate([
    common_1.Post('/change-requests'),
    swagger_1.ApiOperation({ title: 'Create a change request' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ride_change_request_dto_1.CreateRideChangeRequestDto]),
    __metadata("design:returntype", Promise)
], RideManagementController.prototype, "createChangeRequest", null);
__decorate([
    common_1.Patch('/change-requests/:id'),
    swagger_1.ApiOperation({ title: 'Update a change request' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_ride_change_request_dto_1.UpdateRideChangeRequestDto]),
    __metadata("design:returntype", Promise)
], RideManagementController.prototype, "updateChangeRequest", null);
RideManagementController = __decorate([
    swagger_1.ApiUseTags('ride-management'),
    common_1.Controller('private/ride-management'),
    __metadata("design:paramtypes", [ride_management_service_1.RideManagementService])
], RideManagementController);
exports.RideManagementController = RideManagementController;
//# sourceMappingURL=ride-management.controller.js.map