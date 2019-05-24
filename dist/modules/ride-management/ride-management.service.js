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
const service_base_1 = require("../../common/helpers/service.base");
const ride_route_entity_1 = require("./entities/ride-route.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const create_ride_route_dto_1 = require("./dto/create-ride-route.dto");
const ride_client_entity_1 = require("./entities/ride-client.entity");
const ride_place_entity_1 = require("./entities/ride-place.entity");
const ride_place_passenger_entity_1 = require("./entities/ride-place-passenger.entity");
const ride_blueprint_entity_1 = require("./entities/ride-blueprint.entity");
const ride_client_invoice_adjustment_entity_1 = require("./entities/ride-client-invoice-adjustment.entity");
const ride_blueprint_waypoint_entity_1 = require("./entities/ride-blueprint-waypoint.entity");
const ride_bluerprint_waypoint_passenger_entity_1 = require("./entities/ride-bluerprint-waypoint-passenger.entity");
const location_service_1 = require("../location/location.service");
const basic_pagination_dto_1 = require("../../common/helpers/basic-pagination.dto");
const place_entity_1 = require("../place/entities/place.entity");
const client_entity_1 = require("../client/client.entity");
const create_blueprint_assignment_dto_1 = require("./dto/create-blueprint-assignment.dto");
const ride_blueprint_assignment_entity_1 = require("./entities/ride-blueprint-assignment.entity");
const ride_driver_payout_adjustment_entity_1 = require("./entities/ride-driver-payout-adjustment.entity");
const passenger_entity_1 = require("../passenger/passenger.entity");
const ride_change_request_entity_1 = require("./entities/ride-change-request.entity");
const create_ride_change_request_dto_1 = require("./dto/create-ride-change-request.dto");
const ride_change_request_find_response_dto_1 = require("./dto/ride-change-request-find-response.dto");
const ride_change_request_type_entity_1 = require("./entities/ride-change-request-type.entity");
const find_ride_route_params_dto_1 = require("./dto/find-ride-route-params.dto");
const exception_messages_1 = require("../../common/error-handling/exception-messages");
const update_ride_route_dto_1 = require("./dto/update-ride-route.dto");
const constant_1 = require("../../common/helpers/constant");
const trip_mutator_service_1 = require("../trip/trip-mutator.service");
const trip_entity_1 = require("../trip/entities/trip.entity");
const week = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
];
let RideManagementService = class RideManagementService extends service_base_1.ServiceBase {
    constructor(repository, blueprintAssignmentRepo, rideBlueprintRepo, rideChangeRequestRepo, driver, locationService, tripModifier) {
        super(ride_route_entity_1.RideRoute, repository);
        this.repository = repository;
        this.blueprintAssignmentRepo = blueprintAssignmentRepo;
        this.rideBlueprintRepo = rideBlueprintRepo;
        this.rideChangeRequestRepo = rideChangeRequestRepo;
        this.driver = driver;
        this.locationService = locationService;
        this.tripModifier = tripModifier;
    }
    async create(data, manager) {
        const rideRoute = await this.processRideRouteInTxChain(data.blueprints, manager);
        await this.processRideClientsInTxChain(data.clients, rideRoute.id, manager);
        await this.processRidePlacesInTxChain(data.places, rideRoute.id, manager);
        await this.processRideBlueprintsInTxChain(data.blueprints, rideRoute.id, manager);
        return rideRoute;
    }
    async updateRideRouteById(id, data, manager) {
        const rideRoute = await manager.findOne(ride_route_entity_1.RideRoute, { id, is_active: true, is_deleted: false, is_archived: false });
        if (!rideRoute) {
            throw new common_1.BadRequestException('The ride route does not exist');
        }
        if (data.blueprints) {
            data.blueprints = await this.validateItemsCount(data.blueprints, ride_blueprint_entity_1.RideBlueprint, rideRoute.id, constant_1.MAX_BLUEPRINT_NUMBER);
            if (data.blueprints.length) {
                await this.processRideBlueprintsInTxChain(data.blueprints, rideRoute.id, manager);
            }
        }
        if (data.clients) {
            data.clients = await this.validateItemsCount(data.clients, ride_client_entity_1.RideClient, rideRoute.id, constant_1.MAX_PAYING_CLIENT_NUMBER);
            if (data.clients.length) {
                await this.processRideClientsInTxChain(data.clients, rideRoute.id, manager);
            }
        }
        if (data.places) {
            data.places = await this.validateItemsCount(data.places, ride_place_entity_1.RidePlace, rideRoute.id, constant_1.MAX_PLACE_NUMBER);
            if (data.places.length) {
                await this.processRidePlacesInTxChain(data.places, rideRoute.id, manager);
            }
        }
        return rideRoute;
    }
    async getRideManagementList(body, pagination, manager) {
        const resultSet = [];
        const routes = await manager.find(ride_route_entity_1.RideRoute, { is_active: true });
        for (const route of routes) {
            const rideBlueprints = await manager.find(ride_blueprint_entity_1.RideBlueprint, { ride_route_id: route.id, is_active: true });
            for (const rideBlueprint of rideBlueprints) {
                const rideBlueprintClientsIds = await manager.createQueryBuilder(ride_client_invoice_adjustment_entity_1.RideClientInvoiceAdjustment, 'rideClientInvoiceAdjustment')
                    .select('rideClientInvoiceAdjustment.client_id')
                    .where(`rideClientInvoiceAdjustment.ride_blueprint_id = :id`, { id: rideBlueprint.id })
                    .getMany();
                const rideBlueprintClientsIdsList = rideBlueprintClientsIds.map((rideBlueprintClientsId) => rideBlueprintClientsId.client_id);
                if (!rideBlueprintClientsIds.length) {
                    break;
                }
                const rideBlueprintClientsNames = await manager.createQueryBuilder(client_entity_1.Client, 'client')
                    .select('client.name')
                    .where(`client.id IN (${rideBlueprintClientsIdsList.join(',')})`)
                    .getMany();
                const rideBlueprintClientsNameList = rideBlueprintClientsNames.map((client) => client.name);
                const rideBlueprintType = rideBlueprint.type_text_value.toLowerCase();
                const rideBlueprintPlacesIdList = [];
                const rideBlueprintPlacesNameList = [];
                if (rideBlueprintType === constant_1.BlueprintTimeTypes.am || rideBlueprintType === constant_1.BlueprintTimeTypes.am_late_start) {
                    const rideBlueprintDropOffPlacesIds = await manager.createQueryBuilder(ride_blueprint_waypoint_entity_1.RideBlueprintWaypoint, 'rideBlueprintWaypoint')
                        .select('rideBlueprintWaypoint.place_id')
                        .where(`rideBlueprintWaypoint.ride_blueprint_id = :id`, { id: rideBlueprint.id })
                        .andWhere(`rideBlueprintWaypoint.type = :type`, { type: constant_1.WAYPOINT_TYPE.DROPOFF })
                        .getMany();
                    rideBlueprintPlacesIdList.push(rideBlueprintDropOffPlacesIds.map((rideBlueprintDropOffPlacesId) => rideBlueprintDropOffPlacesId.place_id));
                }
                else if (rideBlueprintType === constant_1.BlueprintTimeTypes.pm || rideBlueprintType === constant_1.BlueprintTimeTypes.pm_early_return) {
                    const rideBlueprintPickUpPlacesIds = await manager.createQueryBuilder(ride_blueprint_waypoint_entity_1.RideBlueprintWaypoint, 'rideBlueprintWaypoint')
                        .select('rideBlueprintWaypoint.place_id')
                        .where(`rideBlueprintWaypoint.ride_blueprint_id = :id`, { id: rideBlueprint.id })
                        .andWhere(`rideBlueprintWaypoint.type = :type`, { type: constant_1.WAYPOINT_TYPE.PICKUP })
                        .getMany();
                    rideBlueprintPlacesIdList.push(rideBlueprintPickUpPlacesIds.map((rideBlueprintPickUpPlacesId) => rideBlueprintPickUpPlacesId.place_id));
                }
                if (!rideBlueprintPlacesIdList.length) {
                    break;
                }
                const rideBlueprintPlacesNames = await manager.createQueryBuilder(place_entity_1.Place, 'place')
                    .select('place.name')
                    .where(`place.id IN (${rideBlueprintPlacesIdList.join(',')})`)
                    .getMany();
                rideBlueprintPlacesNames.map((place) => rideBlueprintPlacesNameList.push(place.name));
                const result = {
                    blueprint_id: rideBlueprint.id,
                    client_name: "temp client name",
                    clients_names: rideBlueprintClientsNameList,
                    place_name: "temp place name",
                    places_names: rideBlueprintPlacesNameList,
                    route: route.id,
                    blueprint: rideBlueprint.type_text_value,
                    is_assigned: !!(await manager.find(ride_blueprint_assignment_entity_1.RideBlueprintAssignment, { ride_blueprint_id: rideBlueprint.id })).length,
                };
                resultSet.push(result);
            }
        }
        const uniqueStr = [];
        const uniqueSet = [];
        for (const item of resultSet) {
            if (!uniqueStr.includes(JSON.stringify(item))) {
                uniqueStr.push(JSON.stringify(item));
                uniqueSet.push(item);
            }
        }
        return { items: uniqueSet, count: uniqueSet.length };
    }
    async getRouteById(id) {
        const result = {};
        const manager = typeorm_1.getManager();
        const route = await manager.findOneOrFail(ride_route_entity_1.RideRoute, { id });
        const blueprints = await manager.find(ride_blueprint_entity_1.RideBlueprint, { ride_route_id: route.id, is_active: true });
        const places = await manager.find(ride_place_entity_1.RidePlace, { ride_route_id: route.id });
        const clients = await manager.find(ride_client_entity_1.RideClient, {
            ride_route_id: route.id,
        });
        result.clients = [];
        for (const c of clients) {
            result.clients.push({
                id: c.id,
                client_id: c.client_id,
                invoice_responsibility_percentage: c.invoice_responsibility_percentage,
            });
        }
        result.places = [];
        for (const p of places) {
            const rideBlueprint = await this.rideBlueprintRepo.findOne({ ride_route_id: id });
            const type = rideBlueprint.type_text_value.toLowerCase();
            let waypointCurrent;
            let waypointShedule;
            if (type === constant_1.BlueprintTimeTypes.am || type === constant_1.BlueprintTimeTypes.am_late_start) {
                waypointCurrent = await manager.findOne(ride_blueprint_waypoint_entity_1.RideBlueprintWaypoint, { type: 'pick_up', ride_blueprint_id: rideBlueprint.id });
                waypointShedule = await manager.findOne(ride_blueprint_waypoint_entity_1.RideBlueprintWaypoint, { type: 'drop_off', ride_blueprint_id: rideBlueprint.id });
            }
            else {
                waypointCurrent = await manager.findOne(ride_blueprint_waypoint_entity_1.RideBlueprintWaypoint, { type: 'drop_off', ride_blueprint_id: rideBlueprint.id });
                waypointShedule = await manager.findOne(ride_blueprint_waypoint_entity_1.RideBlueprintWaypoint, { type: 'pick_up', ride_blueprint_id: rideBlueprint.id });
            }
            const passengers = await manager.find(ride_bluerprint_waypoint_passenger_entity_1.RideBlueprintWaypointPassenger, { ride_blueprint_waypoint_id: waypointCurrent.id });
            const place = {
                id: p.id,
                place_id: waypointCurrent.place_id,
                passengers: [],
                ride_blueprint_waypoint_id: waypointShedule.id,
            };
            for (const pass of passengers) {
                place.passengers.push({
                    id: pass.id,
                    passenger_id: pass.passenger_id,
                    location_id: pass.location_link_id,
                    ride_blueprint_waypoint_id: waypointCurrent.id,
                });
            }
            result.places.push(place);
        }
        result.blueprints = [];
        for (const b of blueprints) {
            const blueprintData = {
                id: b.id,
                type: b.type_text_value,
                type_of_service: b.type_of_service,
                camera_service_required: b.camera_service_required,
                client_adjustments: [],
                ride_map: [],
                days_of_service: null,
                estimated_mileage: b.estimated_mileage,
                estimated_duration_in_minutes: b.estimated_duration_in_minutes,
            };
            const daysOfService = {};
            for (const prop of Object.keys(b)) {
                if (prop.includes('recurs_on')) {
                    if (b[prop]) {
                        daysOfService[`${prop.split('_')[2]}`] = true;
                    }
                }
            }
            blueprintData.days_of_service = daysOfService;
            const clientAdjs = await manager.find(ride_client_invoice_adjustment_entity_1.RideClientInvoiceAdjustment, { ride_blueprint_id: b.id });
            for (const adj of clientAdjs) {
                blueprintData.client_adjustments.push({
                    id: adj.id,
                    client_id: adj.client_id,
                    discount_amount: adj.discount_amount,
                    other_service_amount: adj.other_service_amount,
                    other_service_item_name: adj.other_service_item_name,
                    estimated_ride_fare: adj.estimated_ride_fare,
                });
            }
            const rideBpWaypoints = await manager.find(ride_blueprint_waypoint_entity_1.RideBlueprintWaypoint, {
                ride_blueprint_id: b.id,
            });
            for (const wp of rideBpWaypoints) {
                const wpData = {
                    id: wp.id,
                    type: wp.type,
                    place_id: wp.place_id || null,
                    distance_in_miles: wp.distance_from_destination_in_miles,
                    distance_in_mins: wp.distance_from_destination_in_mins,
                    eta: wp.estimated_arrival_time,
                    sta: wp.scheduled_arrival_time,
                    am_start: '0',
                    location_id: null,
                    waypoint_passengers: [],
                };
                const waypoints = await manager.createQueryBuilder(ride_blueprint_waypoint_entity_1.RideBlueprintWaypoint, 'wp')
                    .select('wp.id')
                    .where(`wp.ride_blueprint_id = ${b.id}`)
                    .andWhere(`wp.place_id = ${wp.place_id}`)
                    .andWhere('wp.type = :type', { type: wp.type })
                    .getMany();
                const waypointIds = waypoints.map((wpi) => wpi.id);
                const passengers = await manager.createQueryBuilder(ride_bluerprint_waypoint_passenger_entity_1.RideBlueprintWaypointPassenger, 'p')
                    .where(`p.ride_blueprint_waypoint_id IN (${waypointIds.join(',')})`)
                    .getMany();
                if (passengers.length) {
                    for (const passenger of passengers) {
                        const location = await this.locationService.findLocationByLocationLinkId(passenger.location_link_id);
                        if (location && Object.keys(location).length) {
                            wpData.waypoint_passengers.push({
                                waypoint_passenger_id: passenger.id,
                                passenger_id: passenger.passenger_id,
                            });
                            wpData.location_id = location.id;
                        }
                        for (const place of result.places) {
                            for (const pass of place.passengers) {
                                if (pass.passenger_id === passenger.passenger_id) {
                                    pass.location_id = location.id;
                                }
                            }
                        }
                    }
                }
                blueprintData.ride_map.push(wpData);
            }
            result.blueprints.push(blueprintData);
        }
        return result;
    }
    async createBlueprintAssignment(route_id, blueprint_id, body, manager) {
        await this.checkIfBlueprintIsAssignedToRideRoute(blueprint_id);
        let bpAssignment = Object.assign(new ride_blueprint_assignment_entity_1.RideBlueprintAssignment(), {
            ride_blueprint_id: blueprint_id,
            service_start_date: body.service_start_date,
            service_end_date: body.service_end_date,
        });
        for (const driverDaysAndPayment of body.recurring_days_drivers) {
            for (const [key, value] of Object.entries(driverDaysAndPayment)) {
                if (key === 'day') {
                    bpAssignment[`recurs_on_${value}`] = true;
                }
                if (key === 'driver_id') {
                    bpAssignment[`${driverDaysAndPayment.day}_driver_id`] = value;
                }
            }
        }
        bpAssignment = await manager.save(bpAssignment);
        const rideDriverPayoutAdjCreatePromises = [];
        for (const driverDaysAndPayment of body.recurring_days_drivers) {
            const params = {
                ride_blueprint_assignment_id: bpAssignment.id,
                driver_id: driverDaysAndPayment.driver_id,
                add_to_ride_fare_payout: driverDaysAndPayment.add_pay,
                deduct_from_ride_fare_payout: driverDaysAndPayment.deduct_pay,
                estimated_ride_fare_payout: driverDaysAndPayment.estimated_driver_payout,
            };
            rideDriverPayoutAdjCreatePromises.push(manager.save(Object.assign(new ride_driver_payout_adjustment_entity_1.RideDriverPayoutAdjustment(), params)));
        }
        await Promise.all(rideDriverPayoutAdjCreatePromises);
        return bpAssignment;
    }
    async createChangeRequest(data, accountId, manager) {
        const changeRequest = Object.assign(new ride_change_request_entity_1.RideChangeRequest(), {
            effective_date: data.effective_date,
            ride_change_request_type_id: data.type_id,
            note: data.note,
        });
        if (data.ride_route_id) {
            changeRequest.ride_route_id = data.ride_route_id;
        }
        if (data.place_id) {
            changeRequest.place_id = data.place_id;
        }
        if (data.passenger_id) {
            changeRequest.passenger_id = data.passenger_id;
        }
        this.assignRideChangeBlueprintTypes(changeRequest, data.blueprint_types);
        if (data.ride_route_id) {
            const trip = await manager.findOne(trip_entity_1.Trip, { ride_route_id: data.ride_route_id });
            if (trip) {
                const changeReqType = await manager.findOneOrFail(ride_change_request_type_entity_1.RideChangeRequestType, { id: data.type_id });
                const actionType = constant_1.CHANGE_REQ_TYPE_ACTION_MAP[changeReqType.text_value];
                if (actionType === constant_1.TRIP_SET_CANCELED_IN_ADVANCE_WAYPOINT_PASSENGER_STATUS && data.passenger_id) {
                    await this.tripModifier.dispatch(trip.id, { type: actionType, payload: { passengerId: data.passenger_id } }, manager);
                }
            }
        }
        return await manager.save(changeRequest);
    }
    async updateChangeRequest(id, data) {
        let existingChangeRequest = await this.rideChangeRequestRepo.findOne({ id });
        if (!existingChangeRequest) {
            throw new common_1.BadRequestException(exception_messages_1.MISSING_RECORD);
        }
        existingChangeRequest = Object.assign(existingChangeRequest, data, { ride_change_request_type_id: data.type_id });
        this.assignRideChangeBlueprintTypes(existingChangeRequest, data.blueprint_types);
        return await this.rideChangeRequestRepo.save(existingChangeRequest);
    }
    async findChangeRequest(params) {
        const manager = typeorm_1.getManager();
        const q = this.rideChangeRequestRepo.createQueryBuilder('t');
        if (params.route_id) {
            q.andWhere(`t.ride_route_id = :id`, { id: params.route_id });
        }
        if (params.place_name) {
            const placeQuery = manager.createQueryBuilder(place_entity_1.Place, 'p')
                .where(`p.name LIKE '%${params.place_name}%'`);
            for (const namePart of params.place_name.split(' ')) {
                placeQuery
                    .orWhere(`p.name LIKE '%${namePart}%'`);
            }
            const places = await placeQuery.getMany();
            if (places && places.length) {
                q.andWhere(`t.place_id IN (:placeIds)`, { placeIds: places.map((p) => p.id) });
            }
            else {
                return { items: [], count: 0 };
            }
        }
        if (params.place_name === '') {
            const places = await manager.find(place_entity_1.Place, { is_deleted: false });
            q.andWhere(`t.place_id IN (:placeIds)`, { placeIds: places.map((p) => p.id) });
        }
        if (params.passenger_name) {
            const p = manager.createQueryBuilder(passenger_entity_1.Passenger, 'p')
                .where(`p.first_name LIKE '%${params.passenger_name}%'`)
                .orWhere(`p.last_name LIKE '%${params.passenger_name}%'`);
            for (const namePart of params.passenger_name.split(' ')) {
                p
                    .orWhere(`p.first_name LIKE '%${namePart}%'`)
                    .orWhere(`p.last_name LIKE '%${namePart}%'`);
            }
            const passengers = await p.getMany();
            if (passengers && passengers.length) {
                q.andWhere(`t.passenger_id IN (:passengerIds)`, { passengerIds: passengers.map((pass) => pass.id) });
            }
            else {
                return { items: [], count: 0 };
            }
        }
        if (params.passenger_name === '') {
            const passengers = await manager.find(passenger_entity_1.Passenger, { is_deleted: false });
            q.andWhere(`t.passenger_id IN (:passengerIds)`, { passengerIds: passengers.map((p) => p.id) });
        }
        const changeRequests = await q.getMany();
        const items = [];
        for (const r of changeRequests) {
            const blueprints = [];
            for (const [k, v] of Object.entries(r)) {
                if (v && k.includes('apply_to')) {
                    blueprints.push(k.toString().split('_').slice(2, -1).join(' '));
                }
            }
            const type = await manager.findOne(ride_change_request_type_entity_1.RideChangeRequestType, { id: r.ride_change_request_type_id });
            items.push(Object.assign(new ride_change_request_find_response_dto_1.RideChangeRequestFindResponseDto(), r, {
                type: type ? type.name : null,
                route_id: r.ride_route_id,
                place: r.place_id ? await manager.findOne(place_entity_1.Place, r.place_id) : null,
                passenger: r.passenger_id ? await manager.findOne(passenger_entity_1.Passenger, r.passenger_id) : null,
                blueprints,
            }));
        }
        return { items, count: items.length };
    }
    async getRideInfo(blueprint_id) {
        const blueprint = await this.checkIfBlueprintIsAssignedToRideRoute(blueprint_id);
        const rideRoute = await this.repository.findOne({ id: blueprint.ride_route_id });
        const waypoint = await this.blueprintAssignmentRepo.find({ ride_blueprint_id: blueprint_id });
        const drivers = await Promise.all(week
            .filter(value => waypoint[0][`recurs_on_${value}`])
            .map(async (value) => {
            const driver = await this.driver.findOne({ driver_id: waypoint[0][`${value}_driver_id`] });
            return {
                day: value,
                driver_id: driver.driver_id,
                add_to_ride_fare_payout: driver.add_to_ride_fare_payout,
                deduct_from_ride_fare_payout: driver.deduct_from_ride_fare_payout,
                estimated_ride_fare_payout: driver.estimated_ride_fare_payout,
            };
        }));
        return {
            route_id: blueprint.ride_route_id,
            type_name: blueprint.type_text_value,
            service_start_date: waypoint[0].service_start_date,
            service_end_date: waypoint[0].service_end_date,
            recurring_days_drivers: drivers,
        };
    }
    async validateItemsCount(item, entity, rideRouteId, maxCount) {
        const manager = typeorm_1.getManager();
        const existingCount = await manager.count(entity, { ride_route_id: rideRouteId });
        if (!existingCount || existingCount < maxCount) {
            const availableCount = maxCount - existingCount;
            item = item.slice(0, availableCount);
            return item;
        }
        return [];
    }
    async checkIfBlueprintIsAssignedToRideRoute(blueprint_id) {
        const blueprint = await this.rideBlueprintRepo.findOne({ id: blueprint_id });
        if (!blueprint) {
            throw new common_1.BadRequestException('The blueprint doesn\'t belong to the ride');
        }
        return blueprint;
    }
    assignBlueprintTypes(obj, type) {
        const blueprintType = constant_1.BlueprintTimeTypes[type.toLowerCase()];
        if (!blueprintType) {
            throw new common_1.BadRequestException(constant_1.EXC_UNKNOWN_BLUEPRINT_TYPE);
        }
        else
            obj.type_text_value = blueprintType;
    }
    assignRouteBlueprintTypes(obj, type) {
        const blueprintType = type.toLowerCase();
        switch (blueprintType) {
            case constant_1.BlueprintTimeTypes.am: {
                obj.has_am = true;
                break;
            }
            case constant_1.BlueprintTimeTypes.am_late_start: {
                obj.has_am_late_start = true;
                break;
            }
            case constant_1.BlueprintTimeTypes.pm: {
                obj.has_pm = true;
                break;
            }
            case constant_1.BlueprintTimeTypes.pm_early_return: {
                obj.has_pm_early_return = true;
                break;
            }
            default: {
                throw new common_1.BadRequestException(constant_1.EXC_UNKNOWN_BLUEPRINT_TYPE);
                break;
            }
        }
    }
    async processRideRouteInTxChain(blueprints, manager, rideRoute) {
        if (!rideRoute) {
            rideRoute = new ride_route_entity_1.RideRoute();
        }
        for (const blueprint of blueprints) {
            this.assignRouteBlueprintTypes(rideRoute, blueprint.type);
        }
        return await manager.save(rideRoute);
    }
    async processRideClientsInTxChain(clients, rideRouteId, manager) {
        for (const c of clients) {
            const client = Object.assign(new ride_client_entity_1.RideClient(), c, { ride_route_id: rideRouteId });
            await manager.save(client);
        }
    }
    async processRidePlacesInTxChain(places, rideRouteId, manager) {
        for (const p of places) {
            const ridePlace = Object.assign(new ride_place_entity_1.RidePlace(), { ride_route_id: rideRouteId }, p);
            await this.processRidePassengersInTxChain(p.passengers, p.place_id, rideRouteId, manager);
            await manager.save(ridePlace);
        }
    }
    async processRideBlueprintsInTxChain(blueprints, rideRouteId, manager) {
        for (const bp of blueprints) {
            let blueprint = Object.assign(new ride_blueprint_entity_1.RideBlueprint(), { ride_route_id: rideRouteId }, bp);
            blueprint.is_active = true;
            blueprint.estimated_mileage = blueprint.ride_map.reduce((a, v) => a + v.distance_in_miles, 0);
            blueprint.estimated_duration_in_minutes = blueprint.ride_map.reduce((a, v) => a + v.distance_in_mins, 0);
            await this.assignRecurringDays(blueprint, bp.days_of_service);
            this.assignBlueprintTypes(blueprint, bp.type);
            blueprint = await manager.save(blueprint);
            await this.processClientInvoiceAdjustmentsTxChain(bp.client_adjustments, blueprint.id, manager);
            let order = 1;
            for (const wp of bp.ride_map) {
                const distances = {
                    distance_from_prior_stop_in_miles: 0,
                    distance_from_prior_stop_in_mins: 0,
                    distance_from_destination_in_miles: wp.distance_in_miles || 0,
                    distance_from_destination_in_mins: wp.distance_in_mins || 0,
                };
                let waypoint = Object.assign(new ride_blueprint_waypoint_entity_1.RideBlueprintWaypoint(), { ride_blueprint_id: blueprint.id }, distances, {
                    id: wp.id,
                    order,
                    type: wp.type,
                    place_id: wp.place_id ? wp.place_id : null,
                    estimated_arrival_time: wp.eta,
                    scheduled_arrival_time: wp.sta,
                });
                waypoint = await manager.save(waypoint);
                wp.waypoint_passengers.map(async (pass) => {
                    if (!pass.waypoint_passenger_id) {
                        console.log(pass);
                        await this.processWaypointPassengerInTxChain(wp, pass.passenger_id, waypoint.id, manager);
                    }
                });
                order++;
            }
        }
    }
    async processRidePassengersInTxChain(passengers, placeId, rideRouteId, manager) {
        const ridePassengers = [];
        for (const passenger of passengers) {
            const ridePassenger = Object.assign(new ride_place_passenger_entity_1.RidePlacePassenger(), { passenger_id: passenger.passenger_id, place_id: placeId, ride_route_id: rideRouteId });
            ridePassengers.push(manager.save(ridePassenger));
        }
        return await Promise.all(ridePassengers);
    }
    async processClientInvoiceAdjustmentsTxChain(clientAdj, blueprintId, manager) {
        const rideClientInvoiceAdjustments = [];
        for (const c of clientAdj) {
            const clientInvoiceAdj = Object.assign(new ride_client_invoice_adjustment_entity_1.RideClientInvoiceAdjustment(), c, { ride_blueprint_id: blueprintId });
            rideClientInvoiceAdjustments.push(manager.save(clientInvoiceAdj));
        }
        return await Promise.all(rideClientInvoiceAdjustments);
    }
    async processWaypointPassengerInTxChain(waypoint, passenger_id, waypointId, manager) {
        const locationLink = await this.locationService.findLocationLinkInTxChain(waypoint.location_id, { name: 'passenger', id: passenger_id }, manager);
        const waypointPassenger = Object.assign(new ride_bluerprint_waypoint_passenger_entity_1.RideBlueprintWaypointPassenger(), {
            id: waypoint.id,
            ride_blueprint_waypoint_id: waypointId,
            passenger_id,
            location_link_id: locationLink.id,
        });
        return await manager.save(waypointPassenger);
    }
    assignRideChangeBlueprintTypes(target, types) {
        for (const [key, value] of Object.entries(types)) {
            if (value) {
                target[`apply_to_${key}`] = true;
            }
        }
    }
    assignRecurringDays(target, daysOfService) {
        for (const day of Object.keys(daysOfService)) {
            if (daysOfService[day]) {
                target[`recurs_on_${day}`] = true;
            }
        }
    }
    findWithRelations(alias) {
        return this.repository.createQueryBuilder('t')
            .leftJoinAndMapMany(`${alias}.blueprints`, ride_blueprint_entity_1.RideBlueprint, 'bp', `bp.ride_route_id = ${alias}.id`)
            .leftJoin(ride_place_entity_1.RidePlace, 'ride_place', `${alias}.id = ride_place.ride_route_id`)
            .leftJoin(ride_client_entity_1.RideClient, 'ride_client', `${alias}.id = ride_client.ride_route_id`)
            .leftJoinAndMapMany('bp.clients', client_entity_1.Client, 'cl', 'cl.id = ride_client.')
            .leftJoinAndMapMany(`${alias}.places`, place_entity_1.Place, 'p', `ride_place.place_id = p.id`)
            .leftJoin(ride_client_entity_1.RideClient, 'ride_client', `${alias}.id = ride_client.ride_route_id`)
            .leftJoinAndMapMany(`${alias}.clients`, client_entity_1.Client, 'c', `ride_client.client_id = c.id`);
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ride_route_dto_1.CreateRideRouteDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], RideManagementService.prototype, "create", null);
__decorate([
    typeorm_1.Transaction(),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_ride_route_dto_1.UpdateRideRouteDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], RideManagementService.prototype, "updateRideRouteById", null);
__decorate([
    typeorm_1.Transaction(),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_ride_route_params_dto_1.FindRideRouteParamsDto,
        basic_pagination_dto_1.BasicPaginationDto,
        typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], RideManagementService.prototype, "getRideManagementList", null);
__decorate([
    typeorm_1.Transaction(),
    __param(3, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_blueprint_assignment_dto_1.CreateBlueprintAssignmentDto,
        typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], RideManagementService.prototype, "createBlueprintAssignment", null);
__decorate([
    typeorm_1.Transaction(),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ride_change_request_dto_1.CreateRideChangeRequestDto, Number, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], RideManagementService.prototype, "createChangeRequest", null);
RideManagementService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(ride_route_entity_1.RideRoute)),
    __param(1, typeorm_2.InjectRepository(ride_blueprint_assignment_entity_1.RideBlueprintAssignment)),
    __param(2, typeorm_2.InjectRepository(ride_blueprint_entity_1.RideBlueprint)),
    __param(3, typeorm_2.InjectRepository(ride_change_request_entity_1.RideChangeRequest)),
    __param(4, typeorm_2.InjectRepository(ride_driver_payout_adjustment_entity_1.RideDriverPayoutAdjustment)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        location_service_1.LocationService,
        trip_mutator_service_1.TripMutatorService])
], RideManagementService);
exports.RideManagementService = RideManagementService;
//# sourceMappingURL=ride-management.service.js.map