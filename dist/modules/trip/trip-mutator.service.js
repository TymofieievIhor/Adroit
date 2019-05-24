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
const typeorm_1 = require("typeorm");
const trip_entity_1 = require("./entities/trip.entity");
const action_dto_1 = require("./trip-mutator-dto/action.dto");
const constant_1 = require("../../common/helpers/constant");
const trip_driver_entity_1 = require("./entities/trip-driver.entity");
const trip_vehicle_entity_1 = require("./entities/trip-vehicle.entity");
const trip_service_1 = require("./trip.service");
const common_1 = require("@nestjs/common");
const trip_modification_entity_1 = require("./entities/trip-modification.entity");
const account_service_1 = require("../account/account.service");
const account_entity_1 = require("../account/account.entity");
const deep_diff_1 = require("deep-diff");
const trip_waypoint_entity_1 = require("./entities/trip-waypoint.entity");
const trip_waypoint_passenger_entity_1 = require("./entities/trip-waypoint-passenger.entity");
const exception_messages_1 = require("../../common/error-handling/exception-messages");
const trip_passenger_entity_1 = require("./entities/trip-passenger.entity");
let TripMutatorService = class TripMutatorService {
    constructor(tripService, accountService) {
        this.tripService = tripService;
        this.accountService = accountService;
    }
    getActionList() {
        return Object.values(constant_1.TRIP_STATUSES);
    }
    async dispatch(tripId, action, manager) {
        switch (action.type) {
            case constant_1.INITIATE_TRIP:
                await this.txCreateSnapshotOrFail(tripId, action.type, action.account_id, manager);
                break;
            case constant_1.TRIP_SWITCH_DRIVER_ACTION:
                const driver = await manager.findOneOrFail(trip_driver_entity_1.TripDriver, {
                    trip_id: tripId,
                });
                const vehicle = await manager.findOneOrFail(trip_vehicle_entity_1.TripVehicle, {
                    trip_id: tripId,
                });
                await this.tripService.txChangeTripDriverOrFail({ tripId, currentDriverId: driver.id, newDriverId: action.payload.driver_id }, manager);
                await this.tripService.txChangeTripVehicleOrFail({
                    tripId,
                    currentVehicleId: vehicle.id,
                    newVehicleId: action.payload.vehicle_id,
                    currentDriverId: driver.id,
                    newDriverId: action.payload.driver_id,
                }, manager);
                break;
            case constant_1.TRIP_ACCEPT_TRIP:
                await this.tripService.txChangeTripStatusOrFail(tripId, { type: constant_1.TRIP_STATUSES.ACCEPTED }, manager);
                break;
            case constant_1.TRIP_DECLINE_TRIP:
                await this.tripService.txChangeTripStatusOrFail(tripId, { type: constant_1.TRIP_STATUSES.DECLINED }, manager);
                break;
            case constant_1.TRIP_ENROUTE_WAYPOINT: {
                const isFirstEndpoint = manager
                    .createQueryBuilder(trip_waypoint_entity_1.TripWaypoint, 't')
                    .where('t.id = :id', { id: action.payload.waypointId })
                    .andWhere('t.order = 1')
                    .getOne();
                if (isFirstEndpoint) {
                    await this.tripService.txChangeTripStatusOrFail(tripId, { type: constant_1.TRIP_STATUSES.IN_PROGRESS }, manager);
                }
                await this.tripService.txChangeTripWaypointStatusOrFail(action.payload.waypointId, constant_1.TRIP_WAYPOINT_STATUSES.ENROUTE, manager);
                break;
            }
            case constant_1.TRIP_SET_ARRIVED_WAYPOINT_STATUS:
                await this.tripService.txChangeTripWaypointStatusOrFail(action.payload.waypointId, constant_1.TRIP_WAYPOINT_STATUSES.ARRIVED, manager);
                break;
            case constant_1.TRIP_SKIP_WAYPOINT:
                await this.tripService.txChangeTripWaypointStatusOrFail(action.payload.waypointId, constant_1.TRIP_WAYPOINT_STATUSES.SKIPPED, manager);
                break;
            case constant_1.TRIP_COMPLETE_WAYPOINT: {
                await this.tripService.txChangeTripWaypointStatusOrFail(action.payload.waypointId, constant_1.TRIP_WAYPOINT_STATUSES.COMPLETED, manager);
                const lastWaypoint = await manager
                    .createQueryBuilder(trip_waypoint_entity_1.TripWaypoint, 't')
                    .where(`t.trip_id = :id`, { id: tripId })
                    .orderBy('order', 'DESC')
                    .getOne();
                if (lastWaypoint && lastWaypoint.status === constant_1.TRIP_WAYPOINT_STATUSES.COMPLETED) {
                    const tripWaypointIds = (await manager.find(trip_waypoint_entity_1.TripWaypoint, { trip_id: tripId })).map((wp) => wp.id);
                    const passengers = await manager.createQueryBuilder(trip_waypoint_passenger_entity_1.TripWaypointPassenger, 'p')
                        .where(`p.id in (${tripWaypointIds})`)
                        .andWhere(`p.status IN ('${constant_1.TRIP_WAYPOINT_PASSENGER_STATUSES.PICKED_UP}', '${constant_1.TRIP_WAYPOINT_PASSENGER_STATUSES.DROPPED_OFF}')`)
                        .getMany();
                    if (passengers && passengers.length) {
                        await this.tripService.txChangeTripStatusOrFail(tripId, { type: constant_1.TRIP_STATUSES.SERVICED }, manager);
                    }
                }
                else {
                    const q = manager
                        .createQueryBuilder(trip_waypoint_entity_1.TripWaypoint, 't')
                        .where(`t.trip_id = :id`, { id: tripId });
                    const currentWaypoint = await manager.findOneOrFail(trip_waypoint_entity_1.TripWaypoint, { id: action.payload.waypointId });
                    const nextWaypoint = await q
                        .andWhere(`t.order = :order`, { order: currentWaypoint.order + 1 })
                        .getOne();
                    await this.tripService.txChangeTripWaypointStatusOrFail(nextWaypoint.id, constant_1.TRIP_WAYPOINT_STATUSES.ENROUTE, manager);
                }
                break;
            }
            case constant_1.TRIP_PICK_UP_PASSENGER:
                await this.tripService.txChangeTripWaypointPassengerStatusOrFail(action.payload.passengerId, constant_1.TRIP_WAYPOINT_PASSENGER_STATUSES.PICKED_UP, manager);
                break;
            case constant_1.TRIP_DROP_OFF_PASSENGER:
                await this.tripService.txChangeTripWaypointPassengerStatusOrFail(action.payload.passengerId, constant_1.TRIP_WAYPOINT_PASSENGER_STATUSES.DROPPED_OFF, manager);
                break;
            case constant_1.TRIP_SET_NO_SHOW_WAYPOINT_PASSENGER_STATUS: {
                await this.tripService.txChangeTripWaypointPassengerStatusOrFail(action.payload.passengerId, constant_1.TRIP_WAYPOINT_PASSENGER_STATUSES.NO_SHOW, manager);
                const waypoints = await manager.find(trip_waypoint_entity_1.TripWaypoint, { trip_id: tripId });
                let needToChangeTripStatusToNoShow = true;
                for (const wp of waypoints) {
                    const waypointPassengers = await manager.find(trip_waypoint_passenger_entity_1.TripWaypointPassenger, { trip_waypoint_id: wp.id });
                    if (waypointPassengers && waypointPassengers.length) {
                        for (const pass of waypointPassengers) {
                            if (pass.status !== constant_1.TRIP_WAYPOINT_PASSENGER_STATUSES.NO_SHOW) {
                                needToChangeTripStatusToNoShow = false;
                            }
                        }
                    }
                }
                if (needToChangeTripStatusToNoShow) {
                    await this.tripService.txChangeTripStatusOrFail(tripId, { type: constant_1.TRIP_STATUSES.NO_SHOW }, manager);
                }
                break;
            }
            case constant_1.TRIP_SET_CANCELED_LATE_WAYPOINT_PASSENGER_STATUS:
                await this.tripService.txChangeTripWaypointPassengerStatusOrFail(action.payload.passengerId, constant_1.TRIP_WAYPOINT_PASSENGER_STATUSES.CANCELED_LATE, manager);
                await this.txCheckAndSetWaypointStatusesSkippedOrFail(tripId, manager);
                await this.txCheckAndSetTripStausCanceledOrFail(tripId, constant_1.TRIP_WAYPOINT_PASSENGER_STATUSES.CANCELED_LATE, manager);
                break;
            case constant_1.TRIP_SET_CANCELED_IN_ADVANCE_WAYPOINT_PASSENGER_STATUS:
                await this.tripService.txChangeTripWaypointPassengerStatusOrFail(action.payload.passengerId, constant_1.TRIP_WAYPOINT_PASSENGER_STATUSES.CANCELED_IN_ADVANCE, manager);
                await this.txCheckAndSetWaypointStatusesSkippedOrFail(tripId, manager);
                await this.txCheckAndSetTripStausCanceledOrFail(tripId, constant_1.TRIP_WAYPOINT_PASSENGER_STATUSES.CANCELED_IN_ADVANCE, manager);
                break;
        }
        return await this.txCreateSnapshotOrFail(tripId, action.type, action.account_id, manager);
    }
    async txCheckAndSetTripStausCanceledOrFail(tripId, passengerStatus, manager) {
        const tripPassengerIds = (await manager.find(trip_passenger_entity_1.TripPassenger, { trip_id: tripId })).map((p) => p.id);
        const tripWaypointIds = (await manager.find(trip_waypoint_entity_1.TripWaypoint, { trip_id: tripId })).map((wp) => wp.id);
        if (tripPassengerIds.length && tripPassengerIds.length) {
            const tripWaypointPassengers = await manager
                .createQueryBuilder(trip_waypoint_passenger_entity_1.TripWaypointPassenger, 'p')
                .where(`p.trip_waypoint_id IN (${tripWaypointIds.join(',')})`)
                .andWhere(`p.trip_passenger_id IN (${tripPassengerIds.join(',')})`)
                .getMany();
            const isAllPassengerStatusesCanceled = tripWaypointPassengers.length
                &&
                    tripWaypointPassengers.every((p) => p.status === passengerStatus);
            if (isAllPassengerStatusesCanceled) {
                await this.tripService.txChangeTripStatusOrFail(tripId, passengerStatus.includes('advance') ? { type: constant_1.TRIP_STATUSES.CANCELED_IN_ADVANCE }
                    : { type: constant_1.TRIP_STATUSES.CANCELED_LATE }, manager);
            }
        }
    }
    async txCheckAndSetWaypointStatusesSkippedOrFail(tripId, manager) {
        const tripWaypoint = (await manager.find(trip_waypoint_entity_1.TripWaypoint, { trip_id: tripId })).map((wp) => wp.id);
        if (!tripWaypoint.length) {
            throw new common_1.BadRequestException(exception_messages_1.MISSING_RECORD);
        }
        for (const id of tripWaypoint) {
            const waypointPassengers = await manager.find(trip_waypoint_passenger_entity_1.TripWaypointPassenger, { trip_waypoint_id: id });
            const isAllPassengersStatusCanceled = waypointPassengers.length && waypointPassengers.every((v) => v.status === constant_1.TRIP_WAYPOINT_PASSENGER_STATUSES.CANCELED_LATE
                ||
                    v.status === constant_1.TRIP_WAYPOINT_PASSENGER_STATUSES.CANCELED_IN_ADVANCE);
            if (isAllPassengersStatusCanceled) {
                await this.tripService.txChangeTripWaypointStatusOrFail(id, constant_1.TRIP_WAYPOINT_STATUSES.SKIPPED, manager);
            }
        }
    }
    async txCreateSnapshotOrFail(tripId, actionType, accountId, manager) {
        const snapshot = Object.assign(new trip_modification_entity_1.TripModification(), {
            trip_id: tripId,
            action_type: actionType,
        });
        const account = await this.accountService
            .findWithRelations('a', manager.createQueryBuilder(account_entity_1.Account, 'a'))
            .andWhere(`a.id = :id`, { id: accountId })
            .getOne();
        if (account) {
            snapshot.account_id = account.id;
            snapshot.first_name = account.first_name;
            snapshot.last_name = account.last_name;
            snapshot.account_type = account.account_type.name;
        }
        const trip = await this.tripService
            .findWithRelations(manager.createQueryBuilder(trip_entity_1.Trip, 't'))
            .andWhere('t.id = :id', { id: tripId })
            .getOne();
        if (!trip) {
            throw new common_1.BadRequestException('The trip is missing');
        }
        snapshot.json_trip_state = JSON.stringify(trip);
        const lastSnapshot = await manager.createQueryBuilder(trip_modification_entity_1.TripModification, 't')
            .where({ trip_id: tripId })
            .orderBy('dispatched_at', 'DESC')
            .getOne();
        snapshot.json_new_values = JSON.stringify(lastSnapshot
            ?
                this.compareObjects(trip, JSON.parse(lastSnapshot.json_trip_state))
            :
                'initial');
        return await manager.save(snapshot);
    }
    compareObjects(oldObj, newObj) {
        const result = {};
        const differenceArr = deep_diff_1.diff(oldObj, newObj);
        for (const d of differenceArr) {
            if (d.kind === constant_1.OBJECT_COMPARISON_STATUS_EDITED) {
                result[`trip.${d.path.join('.')}`] = d.rhs;
            }
        }
        return result;
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, action_dto_1.ActionDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], TripMutatorService.prototype, "dispatch", null);
TripMutatorService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [trip_service_1.TripService,
        account_service_1.AccountService])
], TripMutatorService);
exports.TripMutatorService = TripMutatorService;
//# sourceMappingURL=trip-mutator.service.js.map