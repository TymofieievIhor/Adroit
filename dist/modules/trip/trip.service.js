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
const typeorm_1 = require("typeorm");
const driver_entity_1 = require("../driver/driver.entity");
const trip_driver_entity_1 = require("./entities/trip-driver.entity");
const account_entity_1 = require("../account/account.entity");
const vehicle_entity_1 = require("../vehicle/vehicle.entity");
const trip_vehicle_entity_1 = require("./entities/trip-vehicle.entity");
const trip_entity_1 = require("./entities/trip.entity");
const typeorm_2 = require("@nestjs/typeorm");
const trip_place_entity_1 = require("./entities/trip-place.entity");
const trip_passenger_entity_1 = require("./entities/trip-passenger.entity");
const trip_waypoint_entity_1 = require("./entities/trip-waypoint.entity");
const trip_waypoint_passenger_entity_1 = require("./entities/trip-waypoint-passenger.entity");
const constant_1 = require("../../common/helpers/constant");
const exception_messages_1 = require("../../common/error-handling/exception-messages");
const service_base_1 = require("../../common/helpers/service.base");
const partner_entity_1 = require("../partner/partner.entity");
const ride_blueprint_entity_1 = require("../ride-management/entities/ride-blueprint.entity");
const ride_client_entity_1 = require("../ride-management/entities/ride-client.entity");
const client_entity_1 = require("../client/client.entity");
const trip_location_entity_1 = require("./entities/trip-location.entity");
const function_1 = require("../../common/helpers/function");
let TripService = class TripService extends service_base_1.ServiceBase {
    constructor(repository, repositoryTripDriver) {
        super(trip_entity_1.Trip, repository);
        this.repository = repository;
        this.repositoryTripDriver = repositoryTripDriver;
    }
    async find(params, pagination) {
        if (!params) {
            throw new common_1.BadRequestException(exception_messages_1.TRIP_FIND_PARAMS_SHOULD_BE_PRESENT);
        }
        const customFindWithRelations = this.findWithRelations();
        if (!params.date_of_service) {
        }
        else {
            customFindWithRelations.andWhere('t.date_of_service = :date', { date: params.date_of_service });
        }
        if (params.search) {
            if (!isNaN(+params.search)) {
                customFindWithRelations
                    .andWhere(`t.id = :id`, { id: +params.search });
            }
            else {
                customFindWithRelations
                    .andWhere(`t.status LIKE '%${params.search}%'`);
            }
        }
        return super.find(params, pagination, () => customFindWithRelations, 't');
    }
    async txChangeTripDriverOrFail({ tripId, currentDriverId, newDriverId }, manager, accountId) {
        const currentTripDriver = await manager.findOneOrFail(trip_driver_entity_1.TripDriver, {
            driver_id: currentDriverId,
        });
        await manager.save(Object.assign(currentTripDriver, {
            is_switched: true,
            switched_at: new Date(),
            switched_by_account_id: accountId,
        }));
        await this.txCreateTripDriverOrFail(tripId, newDriverId, manager);
    }
    async txChangeTripVehicleOrFail({ tripId, currentVehicleId, newVehicleId, currentDriverId, newDriverId }, manager, accountId) {
        await manager.findOneOrFail(vehicle_entity_1.Vehicle, {
            driver_id: currentDriverId,
            id: currentVehicleId,
        });
        await this.txCreateTripVehicleOrFail(tripId, newDriverId, manager, newVehicleId);
    }
    async txChangeTripStatusOrFail(tripId, status, manager) {
        const trip = await manager.findOneOrFail(trip_entity_1.Trip, { id: tripId });
        switch (status.type) {
            case constant_1.TRIP_STATUSES.DISPATCHED:
                if (trip.status !== constant_1.TRIP_STATUSES.NONE) {
                    throw new common_1.BadRequestException(exception_messages_1.WRONG_TRIP_STATUS);
                }
                break;
            case constant_1.TRIP_STATUSES.ACCEPTED:
                if (trip.status !== constant_1.TRIP_STATUSES.DISPATCHED) {
                    throw new common_1.BadRequestException(exception_messages_1.WRONG_TRIP_STATUS);
                }
                break;
            case constant_1.TRIP_STATUSES.DECLINED:
                if (trip.status !== constant_1.TRIP_STATUSES.DISPATCHED) {
                    throw new common_1.BadRequestException(exception_messages_1.WRONG_TRIP_STATUS);
                }
                break;
            case constant_1.TRIP_STATUSES.IN_PROGRESS:
                if (trip.status !== constant_1.TRIP_STATUSES.ACCEPTED) {
                    throw new common_1.BadRequestException(exception_messages_1.WRONG_TRIP_STATUS);
                }
                break;
            case constant_1.TRIP_STATUSES.SERVICED || constant_1.TRIP_STATUSES.NO_SHOW:
                if (trip.status !== constant_1.TRIP_STATUSES.IN_PROGRESS) {
                    throw new common_1.BadRequestException(exception_messages_1.WRONG_TRIP_STATUS);
                }
                break;
            case constant_1.TRIP_STATUSES.CANCELED_LATE || constant_1.TRIP_STATUSES.CANCELED_IN_ADVANCE:
                if (trip.status !== constant_1.TRIP_STATUSES.IN_PROGRESS) {
                    throw new common_1.BadRequestException(exception_messages_1.WRONG_TRIP_STATUS);
                }
                break;
            default:
                throw new common_1.BadRequestException(exception_messages_1.TRIP_STATUS_DOES_NOT_EXIST);
        }
        await manager.save(Object.assign(trip_entity_1.Trip, { status }));
    }
    async txChangeTripWaypointStatusOrFail(waypointId, status, manager) {
        const waypoint = await manager.findOneOrFail(trip_waypoint_entity_1.TripWaypoint, {
            id: waypointId,
        });
        switch (status) {
            case constant_1.TRIP_WAYPOINT_STATUSES.ENROUTE:
                if (waypoint.status === constant_1.TRIP_WAYPOINT_STATUSES.COMPLETED || waypoint.status === constant_1.TRIP_WAYPOINT_STATUSES.SKIPPED) {
                    throw new common_1.BadRequestException(exception_messages_1.WRONG_WAYPOINT_STATUS);
                }
                await manager.save(Object.assign(waypoint, { status }));
                break;
            case constant_1.TRIP_WAYPOINT_STATUSES.ARRIVED:
                if (waypoint.status !== constant_1.TRIP_WAYPOINT_STATUSES.ENROUTE) {
                    throw new common_1.BadRequestException(exception_messages_1.WRONG_WAYPOINT_STATUS);
                }
                await manager.save(Object.assign(waypoint, { status }));
                break;
            case constant_1.TRIP_WAYPOINT_STATUSES.SKIPPED:
                if (waypoint.status !== constant_1.TRIP_WAYPOINT_STATUSES.NONE) {
                    throw new common_1.BadRequestException(exception_messages_1.WRONG_WAYPOINT_STATUS);
                }
                await manager.save(Object.assign(waypoint, { status }));
                break;
            case constant_1.TRIP_WAYPOINT_STATUSES.COMPLETED:
                if (waypoint.status !== constant_1.TRIP_WAYPOINT_STATUSES.ARRIVED) {
                    throw new common_1.BadRequestException(exception_messages_1.WRONG_WAYPOINT_STATUS);
                }
                await manager.save(Object.assign(waypoint, { status }));
                break;
        }
    }
    async txChangeTripWaypointPassengerStatusOrFail(passengerId, status, manager) {
        const tripPassenger = await manager.findOneOrFail(trip_waypoint_passenger_entity_1.TripWaypointPassenger, { id: passengerId });
        if (tripPassenger.status !== constant_1.TRIP_WAYPOINT_PASSENGER_STATUSES.NONE) {
            throw new common_1.BadRequestException(exception_messages_1.WRONG_WAYPOINT_PASSENGER_STATUS);
        }
        await manager.save(Object.assign(tripPassenger, { status }));
    }
    async txCreateTripDriverOrFail(tripId, driverId, manager) {
        const driver = await manager.createQueryBuilder(driver_entity_1.Driver, 'd')
            .leftJoinAndMapOne('d.account', account_entity_1.Account, 'a', 'a.id = d.account_id')
            .leftJoinAndMapOne('d.partner', partner_entity_1.Partner, 'c', 'c.id = d.partner_id')
            .where(`d.id = :driverId`, { driverId })
            .getOne();
        if (!driver) {
            throw new common_1.BadRequestException('The driver is missing');
        }
        const tripDriver = Object.assign(new trip_driver_entity_1.TripDriver(), {
            driver_account_id: driver.account_id,
            driver_id: driver.id,
            trip_id: tripId,
            first_name: driver.account.first_name,
            last_name: driver.account.last_name,
            phone_number: driver.account.phone_number,
            picture_url: driver.account.picture_url,
            driver_email: driver.account.email,
            partner_name: driver.partner.name,
            partner_id: driver.partner_id,
        });
        return await manager.save(tripDriver);
    }
    async txCreateTripVehicleOrFail(tripId, driverId, manager, vehicleId) {
        const params = {
            driver_id: driverId,
        };
        if (vehicleId) {
            params.id = vehicleId;
        }
        const vehicle = await manager.findOneOrFail(vehicle_entity_1.Vehicle, params);
        const tripVehicle = Object.assign(new trip_vehicle_entity_1.TripVehicle(), {
            vehicle_id: vehicle.id,
            trip_id: tripId,
            license_plate: vehicle.license_plate,
            make: vehicle.make,
            model: vehicle.model,
            type: vehicle.type,
            color: vehicle.color,
        });
        return await manager.save(tripVehicle);
    }
    async getCompletedTripsHistory(driver, client, countDay, pagination) {
        function_1.allowClientDriverOrFail(client);
        const alias = 't';
        const q = this.repository.createQueryBuilder(alias);
        const tripsDriver = await this.repositoryTripDriver.find({ driver_id: driver.id });
        if (!tripsDriver.length) {
            return;
        }
        const tripIds = tripsDriver.map(driverTrip => driverTrip.trip_id);
        q.whereInIds(tripIds);
        q.andWhere(`${alias}.status = "serviced"`);
        if (!countDay) {
            super.applyPagination(q, alias, pagination);
        }
        else {
            q.andWhere(`${alias}.date_of_service >= DATE_ADD(CURDATE(), INTERVAL -:countDay DAY)`, { countDay });
        }
        const [items, count] = await q.getManyAndCount();
        if (!count) {
            return;
        }
        return { items, count };
    }
    async getNextUpcomingTrip(driver, client) {
        function_1.allowClientDriverOrFail(client);
        const alias = 't';
        const q = this.repository.createQueryBuilder(alias);
        const tripsDriver = await this.repositoryTripDriver.find({ driver_id: driver.id });
        if (!tripsDriver.length) {
            return;
        }
        const tripIds = tripsDriver.map(driverTrip => driverTrip.trip_id);
        q.innerJoin(sq => sq.select('min(date_of_service) as date_of_service')
            .from(trip_entity_1.Trip, 'bt')
            .where('bt.id IN (:tripIds)', { tripIds })
            .andWhere('date_of_service >= CURDATE()').andWhere('DATE(date_of_service) = DATE(CURDATE())')
            .andWhere(`status in (:tripStatus)`, { tripStatus: constant_1.TRIP_ENTITY_STATUS_UPCOMING_LIST }), 'b', 't.date_of_service = b.date_of_service');
        this.findWithRelations(q);
        const trip = await q.getOne();
        if (!trip) {
            return;
        }
        return trip;
    }
    findWithRelations(qb) {
        const q = qb ? qb : this.repository.createQueryBuilder('t');
        return q
            .leftJoinAndMapOne('t.driver', trip_driver_entity_1.TripDriver, 'd', 'd.trip_id = t.id AND d.is_switched != true')
            .leftJoinAndMapOne('t.driver_temp', driver_entity_1.Driver, 'dt', 'dt.id = d.driver_id')
            .leftJoinAndMapOne('d.partner', partner_entity_1.Partner, 'dp', 'dp.id = dt.partner_id')
            .leftJoinAndMapOne('d.account', account_entity_1.Account, 'da', 'da.id = dt.account_id')
            .leftJoinAndMapOne('d.vehicle', trip_vehicle_entity_1.TripVehicle, 'v', 'v.trip_id = t.id AND v.is_switched != true')
            .leftJoinAndMapOne('t.blueprint', ride_blueprint_entity_1.RideBlueprint, 'bp', 'bp.id = t.ride_blueprint_id')
            .leftJoinAndMapMany('t.clients', ride_client_entity_1.RideClient, 'rc', 'rc.ride_route_id = t.ride_route_id')
            .leftJoinAndMapOne('rc.info', client_entity_1.Client, 'c', 'c.id = rc.client_id')
            .leftJoinAndMapMany('t.places', trip_place_entity_1.TripPlace, 'p', 'p.trip_id = t.id')
            .leftJoinAndMapMany('t.passengers', trip_passenger_entity_1.TripPassenger, 'passenger', 'passenger.trip_id = t.id')
            .leftJoinAndMapMany('t.waypoints', trip_waypoint_entity_1.TripWaypoint, 'w', 'w.trip_id = t.id')
            .leftJoinAndMapOne('w.arrival_trip_location', trip_location_entity_1.TripLocation, 'tla', 'w.arrival_trip_location_id = tla.id')
            .leftJoinAndMapOne('w.drop_off_trip_location', trip_location_entity_1.TripLocation, 'tld', 'w.drop_off_trip_location_id = tla.id')
            .leftJoinAndMapOne('w.pick_up_trip_location', trip_location_entity_1.TripLocation, 'tlp', 'w.pick_up_trip_location_id = tla.id')
            .leftJoinAndMapMany('w.passengers', trip_waypoint_passenger_entity_1.TripWaypointPassenger, 'waypointPassenger', 'waypointPassenger.trip_waypoint_id = w.id')
            .where('t.is_deleted != true');
    }
};
TripService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(trip_entity_1.Trip)),
    __param(1, typeorm_2.InjectRepository(trip_driver_entity_1.TripDriver)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], TripService);
exports.TripService = TripService;
//# sourceMappingURL=trip.service.js.map