"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const trip_controller_1 = require("./trip.controller");
const typeorm_1 = require("@nestjs/typeorm");
const trip_entity_1 = require("./entities/trip.entity");
const trip_driver_entity_1 = require("./entities/trip-driver.entity");
const trip_orchestrator_controller_1 = require("./trip-orchestrator.controller");
const trip_orchestrator_service_1 = require("./trip-orchestrator.service");
const trip_service_1 = require("./trip.service");
const location_module_1 = require("../location/location.module");
const trip_mutator_service_1 = require("./trip-mutator.service");
const account_module_1 = require("../account/account.module");
let TripModule = class TripModule {
};
TripModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([trip_entity_1.Trip, trip_driver_entity_1.TripDriver]), location_module_1.LocationModule, account_module_1.AccountModule],
        providers: [trip_orchestrator_service_1.TripOrchestratorService, trip_service_1.TripService, trip_mutator_service_1.TripMutatorService],
        controllers: [trip_controller_1.TripController, trip_orchestrator_controller_1.TripOrchestratorController],
        exports: [trip_orchestrator_service_1.TripOrchestratorService, trip_service_1.TripService, trip_mutator_service_1.TripMutatorService],
    })
], TripModule);
exports.TripModule = TripModule;
//# sourceMappingURL=trip.module.js.map