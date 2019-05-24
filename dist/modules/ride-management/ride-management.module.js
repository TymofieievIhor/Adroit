"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ride_management_controller_1 = require("./ride-management.controller");
const ride_management_service_1 = require("./ride-management.service");
const typeorm_1 = require("@nestjs/typeorm");
const ride_route_entity_1 = require("./entities/ride-route.entity");
const location_module_1 = require("../location/location.module");
const ride_blueprint_assignment_entity_1 = require("./entities/ride-blueprint-assignment.entity");
const ride_blueprint_entity_1 = require("./entities/ride-blueprint.entity");
const ride_change_request_entity_1 = require("./entities/ride-change-request.entity");
const trip_module_1 = require("../trip/trip.module");
const ride_driver_payout_adjustment_entity_1 = require("./entities/ride-driver-payout-adjustment.entity");
let RideManagementModule = class RideManagementModule {
};
RideManagementModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ride_route_entity_1.RideRoute, ride_blueprint_assignment_entity_1.RideBlueprintAssignment, ride_blueprint_entity_1.RideBlueprint, ride_change_request_entity_1.RideChangeRequest, ride_driver_payout_adjustment_entity_1.RideDriverPayoutAdjustment]),
            location_module_1.LocationModule,
            trip_module_1.TripModule,
        ],
        controllers: [ride_management_controller_1.RideManagementController],
        providers: [ride_management_service_1.RideManagementService],
        exports: [ride_management_service_1.RideManagementService],
    })
], RideManagementModule);
exports.RideManagementModule = RideManagementModule;
//# sourceMappingURL=ride-management.module.js.map