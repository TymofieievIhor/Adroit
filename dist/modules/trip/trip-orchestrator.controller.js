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
const trip_orchestrator_service_1 = require("./trip-orchestrator.service");
const swagger_1 = require("@nestjs/swagger");
const create_daily_recurring_trip_dto_1 = require("./dto/create-daily-recurring-trip.dto");
const trip_mutator_service_1 = require("./trip-mutator.service");
const action_dto_1 = require("./trip-mutator-dto/action.dto");
let TripOrchestratorController = class TripOrchestratorController {
    constructor(service, serviceMutator) {
        this.service = service;
        this.serviceMutator = serviceMutator;
    }
    async createDailyRecurringTrip(body) {
        return this.service.createDailyRecurringTrip(body);
    }
    async getActionList() {
        return this.serviceMutator.getActionList();
    }
    async changeTripStatus(body, tripId) {
        return this.serviceMutator.dispatch(tripId, body);
    }
};
__decorate([
    common_1.Post('/'),
    swagger_1.ApiOperation({ title: 'Create a daily recurring trip' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_daily_recurring_trip_dto_1.CreateDailyRecurringTripDto]),
    __metadata("design:returntype", Promise)
], TripOrchestratorController.prototype, "createDailyRecurringTrip", null);
__decorate([
    common_1.Get('/'),
    swagger_1.ApiOperation({ title: 'Get list of action' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TripOrchestratorController.prototype, "getActionList", null);
__decorate([
    common_1.Patch('/:id'),
    swagger_1.ApiOperation({ title: 'Change trip status' }),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [action_dto_1.ActionDto, Number]),
    __metadata("design:returntype", Promise)
], TripOrchestratorController.prototype, "changeTripStatus", null);
TripOrchestratorController = __decorate([
    common_1.Controller('private/trip-orchestrator'),
    swagger_1.ApiUseTags('trip-orchestrator'),
    __metadata("design:paramtypes", [trip_orchestrator_service_1.TripOrchestratorService, trip_mutator_service_1.TripMutatorService])
], TripOrchestratorController);
exports.TripOrchestratorController = TripOrchestratorController;
//# sourceMappingURL=trip-orchestrator.controller.js.map