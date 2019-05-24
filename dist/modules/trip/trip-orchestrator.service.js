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
const service_base_1 = require("../../common/helpers/service.base");
const trip_entity_1 = require("./entities/trip.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const ride_blueprint_entity_1 = require("../ride-management/entities/ride-blueprint.entity");
const ride_blueprint_assignment_entity_1 = require("../ride-management/entities/ride-blueprint-assignment.entity");
const common_1 = require("@nestjs/common");
const create_daily_recurring_trip_dto_1 = require("./dto/create-daily-recurring-trip.dto");
const ride_route_entity_1 = require("../ride-management/entities/ride-route.entity");
const ride_blueprint_waypoint_entity_1 = require("../ride-management/entities/ride-blueprint-waypoint.entity");
const constant_1 = require("../../common/helpers/constant");
const ride_place_entity_1 = require("../ride-management/entities/ride-place.entity");
const place_entity_1 = require("../place/entities/place.entity");
const trip_place_entity_1 = require("./entities/trip-place.entity");
const location_entity_1 = require("../location/location.entity");
const passenger_entity_1 = require("../passenger/passenger.entity");
const trip_passenger_entity_1 = require("./entities/trip-passenger.entity");
const trip_waypoint_entity_1 = require("./entities/trip-waypoint.entity");
const ride_bluerprint_waypoint_passenger_entity_1 = require("../ride-management/entities/ride-bluerprint-waypoint-passenger.entity");
const location_service_1 = require("../location/location.service");
const trip_location_entity_1 = require("./entities/trip-location.entity");
const trip_service_1 = require("./trip.service");
const trip_waypoint_passenger_entity_1 = require("./entities/trip-waypoint-passenger.entity");
const trip_mutator_service_1 = require("./trip-mutator.service");
const exception_messages_1 = require("../../common/error-handling/exception-messages");
let TripOrchestratorService = class TripOrchestratorService extends service_base_1.ServiceBase {
    constructor(repository, locationService, tripService, tripMutatorService) {
        super(trip_entity_1.Trip, repository);
        this.repository = repository;
        this.locationService = locationService;
        this.tripService = tripService;
        this.tripMutatorService = tripMutatorService;
        this.recurringDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    }
    async createDailyRecurringTrip(data, manager) {
        const rideBlueprints = await manager.find(ride_blueprint_entity_1.RideBlueprint, {
            is_deleted: false,
            is_archived: false,
        });
        if (!rideBlueprints.length) {
            throw new common_1.BadRequestException(`You don't have a blueprint!`);
        }
        const date = new Date(data.provided_date);
        const recurringDay = this.recurringDays[date.getDay()];
        const rideBlueprintAssignment = await manager.createQueryBuilder(ride_blueprint_assignment_entity_1.RideBlueprintAssignment, 'r')
            .where(`r.ride_blueprint_id IN (${rideBlueprints.map((bp) => bp.id).join(', ')})`)
            .andWhere(`r.is_deleted != true AND r.is_archived != true`)
            .andWhere(`r.service_start_date <= :providedDate`, { providedDate: data.provided_date })
            .andWhere(`r.service_end_date >= :providedDate`, { providedDate: data.provided_date })
            .andWhere(`r.recurs_on_${recurringDay} = true`)
            .andWhere(`r.${recurringDay}_driver_id IS NOT null`)
            .getOne();
        if (!rideBlueprintAssignment) {
            throw new common_1.BadRequestException(`${exception_messages_1.RECURRING_TRIP_CREATION_ERR}: ${exception_messages_1.BP_ASSIGNMENT_NOT_FOUND}`);
        }
        const blueprint = await manager.findOne(ride_blueprint_entity_1.RideBlueprint, { id: rideBlueprintAssignment.ride_blueprint_id });
        let trip = Object.assign(new trip_entity_1.Trip(), data, {
            ride_blueprint_id: rideBlueprintAssignment.ride_blueprint_id,
            camera_service_required: blueprint.camera_service_required,
            type_of_service: blueprint.type_of_service,
            date_of_service: data.provided_date,
            estimated_mileage: blueprint.estimated_mileage,
            estimated_duration_in_minutes: blueprint.estimated_duration_in_minutes,
            map_picture_url: blueprint.map_picture_url,
        });
        const rideRoute = await manager.findOne(ride_route_entity_1.RideRoute, { id: blueprint.ride_route_id });
        trip.type = rideRoute.is_recurring ? 'recurring' : 'scheduled';
        trip.ride_route_id = rideRoute.id;
        trip.status = constant_1.INITIAL_TRIP_STATUS;
        trip = await manager.save(trip);
        const driverId = rideBlueprintAssignment[`${recurringDay}_driver_id`];
        if (!driverId) {
            throw new common_1.BadRequestException(`${exception_messages_1.RECURRING_TRIP_CREATION_ERR}: ${exception_messages_1.DRIVER_ID_IS_MISSING}`);
        }
        const tripDriver = await this.tripService.txCreateTripDriverOrFail(trip.id, driverId, manager);
        await this.tripService.txCreateTripVehicleOrFail(trip.id, tripDriver.driver_id, manager);
        const places = await manager.find(ride_place_entity_1.RidePlace, { ride_route_id: rideRoute.id });
        const tripPlacePromises = [];
        for (const place of places) {
            const placeData = await manager.findOneOrFail(place_entity_1.Place, { id: place.place_id });
            const locationData = await manager.findOneOrFail(location_entity_1.LocationEntity, { id: placeData.location_id });
            const tripPlace = Object.assign(new trip_place_entity_1.TripPlace(), {
                place_id: placeData.id,
                trip_id: trip.id,
                name: placeData.name,
                type_text_value: locationData.type,
                type_name: locationData.type,
            });
            const rideBlueprint = await manager.findOne(ride_blueprint_entity_1.RideBlueprint, { ride_route_id: place.ride_route_id });
            let waypoint;
            if (rideBlueprint.type_text_value === constant_1.BlueprintTimeTypes.am || rideBlueprint.type_text_value === constant_1.BlueprintTimeTypes.am_late_start) {
                waypoint = await manager.findOne(ride_blueprint_waypoint_entity_1.RideBlueprintWaypoint, { type: 'pick_up', ride_blueprint_id: rideBlueprint.id });
            }
            else {
                waypoint = await manager.findOne(ride_blueprint_waypoint_entity_1.RideBlueprintWaypoint, { type: 'drop_off', ride_blueprint_id: rideBlueprint.id });
            }
            const ridePassengers = await manager.find(ride_bluerprint_waypoint_passenger_entity_1.RideBlueprintWaypointPassenger, { ride_blueprint_waypoint_id: waypoint.id });
            const tripPassengerPromises = [];
            for (const pass of ridePassengers) {
                const passengerData = await manager.findOneOrFail(passenger_entity_1.Passenger, { id: pass.passenger_id });
                super.deleteProps(passengerData, constant_1.BASE_ENTITY_PROPS);
                const tripPassenger = Object.assign(new trip_passenger_entity_1.TripPassenger(), {
                    passenger_id: pass.passenger_id,
                    trip_id: trip.id,
                    type_text_value: passengerData.type,
                    type_name: passengerData.type,
                }, passengerData);
                tripPassengerPromises.push(manager.save(tripPassenger));
            }
            await Promise.all(tripPassengerPromises);
            tripPlacePromises.push(manager.save(tripPlace));
        }
        await Promise.all(tripPlacePromises);
        const rideBlueprintWaypoints = await manager.find(ride_blueprint_waypoint_entity_1.RideBlueprintWaypoint, {
            ride_blueprint_id: blueprint.id,
        });
        for (const waypoint of rideBlueprintWaypoints) {
            let tripWaypoint = Object.assign(new trip_waypoint_entity_1.TripWaypoint(), {
                trip_id: trip.id,
                order: waypoint.order,
                type: waypoint.type,
                scheduled_arrival_time: waypoint.scheduled_arrival_time,
                status: constant_1.INITIAL_TRIP_STATUS,
            });
            const waypointPlace = await manager.findOneOrFail(place_entity_1.Place, {
                id: waypoint.place_id,
            });
            const placeLocation = await manager.findOneOrFail(location_entity_1.LocationEntity, {
                id: waypointPlace.location_id,
            });
            super.deleteProps(placeLocation, constant_1.BASE_ENTITY_PROPS);
            const tripLocationPlace = Object.assign(new trip_location_entity_1.TripLocation(), placeLocation, {
                type_text_value: placeLocation.type,
                type_name: placeLocation.type,
            });
            tripWaypoint.scheduled_arrival_trip_location_id = tripLocationPlace.id;
            if (blueprint.type_text_value.toLowerCase().includes('am')) {
                tripWaypoint.drop_off_trip_location_id = tripLocationPlace.id;
                tripWaypoint.scheduled_arrival_trip_location_id = tripLocationPlace.id;
            }
            else if (blueprint.type_text_value.toLowerCase().includes('pm')) {
                tripWaypoint.arrival_trip_location_id = tripLocationPlace.id;
                tripWaypoint.pick_up_trip_location_id = tripLocationPlace.id;
            }
            const passenger = await manager.findOne(ride_bluerprint_waypoint_passenger_entity_1.RideBlueprintWaypointPassenger, {
                ride_blueprint_waypoint_id: waypoint.id,
            });
            let tripWaypointPassenger;
            if (passenger) {
                const tripPassenger = await manager.findOneOrFail(trip_passenger_entity_1.TripPassenger, {
                    passenger_id: passenger.passenger_id,
                    trip_id: trip.id,
                });
                tripWaypointPassenger = Object.assign(new trip_waypoint_passenger_entity_1.TripWaypointPassenger(), {
                    trip_passenger_id: tripPassenger.id,
                    status: constant_1.INITIAL_TRIP_STATUS,
                });
                const location = await this.locationService.findLocationByLocationLinkId(passenger.location_link_id);
                if (location && Object.keys(location).length) {
                    super.deleteProps(location, constant_1.BASE_ENTITY_PROPS);
                    let tripLocation = Object.assign(new trip_location_entity_1.TripLocation(), location, {
                        type_text_value: location.type,
                        type_name: location.type,
                    });
                    tripLocation = await manager.save(tripLocation);
                    if (blueprint.type_text_value.toLowerCase().includes('am')) {
                        tripWaypoint.arrival_trip_location_id = tripLocation.id;
                        tripWaypoint.pick_up_trip_location_id = tripLocation.id;
                    }
                    else if (blueprint.type_text_value.toLowerCase().includes('pm')) {
                        tripWaypoint.drop_off_trip_location_id = tripLocation.id;
                    }
                }
            }
            tripWaypoint = await manager.save(tripWaypoint);
            if (passenger) {
                tripWaypointPassenger.trip_waypoint_id = tripWaypoint.id;
                await manager.save(tripWaypointPassenger);
            }
        }
        return trip;
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_daily_recurring_trip_dto_1.CreateDailyRecurringTripDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], TripOrchestratorService.prototype, "createDailyRecurringTrip", null);
TripOrchestratorService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(trip_entity_1.Trip)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        location_service_1.LocationService,
        trip_service_1.TripService,
        trip_mutator_service_1.TripMutatorService])
], TripOrchestratorService);
exports.TripOrchestratorService = TripOrchestratorService;
//# sourceMappingURL=trip-orchestrator.service.js.map