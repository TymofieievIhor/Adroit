import {BadRequestException, Injectable} from '@nestjs/common';
import {EntityManager, Repository, SelectQueryBuilder} from 'typeorm';
import {Driver} from '../driver/driver.entity';
import {TripDriver} from './entities/trip-driver.entity';
import {Account} from '../account/account.entity';
import {Vehicle} from '../vehicle/vehicle.entity';
import {TripVehicle} from './entities/trip-vehicle.entity';
import {Trip} from './entities/trip.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {TripPlace} from './entities/trip-place.entity';
import {TripPassenger} from './entities/trip-passenger.entity';
import {TripWaypoint} from './entities/trip-waypoint.entity';
import {TripWaypointPassenger} from './entities/trip-waypoint-passenger.entity';
import {
  TRIP_ENTITY_STATUS_UPCOMING_LIST,
  TRIP_STATUSES,
  TRIP_WAYPOINT_PASSENGER_STATUSES,
  TRIP_WAYPOINT_STATUSES,
} from '../../common/helpers/constant';
import {
  TRIP_FIND_PARAMS_SHOULD_BE_PRESENT,
  TRIP_STATUS_DOES_NOT_EXIST,
  WRONG_TRIP_STATUS,
  WRONG_WAYPOINT_PASSENGER_STATUS,
  WRONG_WAYPOINT_STATUS,
} from '../../common/error-handling/exception-messages';
import {ServiceBase} from '../../common/helpers/service.base';
import {BasicPaginationDto} from '../../common/helpers/basic-pagination.dto';
import {IResponseWithPagination} from '../../common/helpers/interfaces/reponseWithPagination.interface';
import {Partner} from '../partner/partner.entity';
import {RideBlueprint} from '../ride-management/entities/ride-blueprint.entity';
import {RideClient} from '../ride-management/entities/ride-client.entity';
import {Client} from '../client/client.entity';
import {TripLocation} from './entities/trip-location.entity';
import {FindTripParamsDto} from './dto/find-trip-params.dto';
import {MyTripsCompleteHistoryDto} from './dto/my-trips-complete-history.dto';
import {API_CLIENT_TYPE} from '../api-client/constant';
import {allowClientDriverOrFail} from '../../common/helpers/function';
import {ClientType} from '../client-type/client-type.entity';

@Injectable()
export class TripService extends ServiceBase<Trip> {

  constructor(@InjectRepository(Trip) protected repository: Repository<Trip>,
              @InjectRepository(TripDriver) protected readonly repositoryTripDriver: Repository<TripDriver>) {
    super(Trip, repository);
  }

  async find(params?: FindTripParamsDto, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Trip>> {
    if (!params) {
      throw new BadRequestException(TRIP_FIND_PARAMS_SHOULD_BE_PRESENT);
    }
    const customFindWithRelations = this.findWithRelations();

    /*

    // TODO: pull blueprint type info here. This is currenlty returning issues.

    switch (params.type) {
      case 'AM':
        customFindWithRelations.andWhere(`(bp.type = 'AM' OR bp.type = 'AM Late Start')`);
        break;
      case 'PM':
        customFindWithRelations.andWhere(`(bp.type = 'PM' OR bp.type = 'PM Early Return')`);
        break;
      default:
      // TODO remove after frontend updates
      // throw new BadRequestException(TRIP_TYPE_UNKNOWN);
    }
    */

    if (!params.date_of_service) {
      // TODO remove after frontend updates
      // throw new BadRequestException(TRIP_DATE_OF_SERVICE_ABSENT);
    } else {
      customFindWithRelations.andWhere('t.date_of_service = :date', {date: params.date_of_service});
    }

    if (params.search) {
      if (!isNaN(+params.search)) {
        customFindWithRelations
          .andWhere(`t.id = :id`, {id: +params.search});
      } else {
        customFindWithRelations
          .andWhere(`t.status LIKE '%${params.search}%'`);
        // TODO search matches to be extended
      }
    }
    return super.find(params, pagination, () => customFindWithRelations, 't');
  }

  async txChangeTripDriverOrFail({tripId, currentDriverId, newDriverId}, manager: EntityManager, accountId?: number): Promise<void> {
    const currentTripDriver = await manager.findOneOrFail(TripDriver, {
      driver_id: currentDriverId,
    });
    await manager.save(Object.assign(currentTripDriver, {
      is_switched: true,
      switched_at: new Date(),
      switched_by_account_id: accountId,
    }));

    await this.txCreateTripDriverOrFail(tripId, newDriverId, manager);
  }

  async txChangeTripVehicleOrFail(
    {tripId, currentVehicleId, newVehicleId, currentDriverId, newDriverId}, manager: EntityManager, accountId?: number,
  ): Promise<void> {
    await manager.findOneOrFail(Vehicle, {
      driver_id: currentDriverId,
      id: currentVehicleId,
    });

    await this.txCreateTripVehicleOrFail(tripId, newDriverId, manager, newVehicleId);
  }

  async txChangeTripStatusOrFail(tripId: number, status: string, manager: EntityManager): Promise<void> {
    const trip = await manager.findOneOrFail(Trip, {id: tripId});

    switch (status) {
      case TRIP_STATUSES.DISPATCHED:
        if (trip.status !== TRIP_STATUSES.NONE) {
          throw new BadRequestException(WRONG_TRIP_STATUS);
        }
        break;
      case TRIP_STATUSES.ACCEPTED:
        if (trip.status !== TRIP_STATUSES.DISPATCHED) {
          throw new BadRequestException(WRONG_TRIP_STATUS);
        }
        break;
      case TRIP_STATUSES.DECLINED:
        if (trip.status !== TRIP_STATUSES.DISPATCHED) {
          throw new BadRequestException(WRONG_TRIP_STATUS);
        }
        break;
      case TRIP_STATUSES.IN_PROGRESS:
        if (trip.status !== TRIP_STATUSES.ACCEPTED) {
          throw new BadRequestException(WRONG_TRIP_STATUS);
        }
        break;
      case TRIP_STATUSES.SERVICED || TRIP_STATUSES.NO_SHOW:
        if (trip.status !== TRIP_STATUSES.IN_PROGRESS) {
          throw new BadRequestException(WRONG_TRIP_STATUS);
        }
        break;
      case TRIP_STATUSES.CANCELED_LATE || TRIP_STATUSES.CANCELED_IN_ADVANCE:
        if (trip.status !== TRIP_STATUSES.IN_PROGRESS) {
          throw new BadRequestException(WRONG_TRIP_STATUS);
        }
        break;
      default:
        throw new BadRequestException(TRIP_STATUS_DOES_NOT_EXIST);
    }
    await manager.save(Object.assign(Trip, {status}));
  }

  async txChangeTripWaypointStatusOrFail(waypointId: number, status: string, manager: EntityManager): Promise<void> {
    const waypoint = await manager.findOneOrFail(TripWaypoint, {
      id: waypointId,
    });

    switch (status) {
      case TRIP_WAYPOINT_STATUSES.ENROUTE:
        if (waypoint.status === TRIP_WAYPOINT_STATUSES.COMPLETED || waypoint.status === TRIP_WAYPOINT_STATUSES.SKIPPED) {
          throw new BadRequestException(WRONG_WAYPOINT_STATUS);
        }
        await manager.save(Object.assign(waypoint, {status}));
        break;
      case TRIP_WAYPOINT_STATUSES.ARRIVED:
        if (waypoint.status !== TRIP_WAYPOINT_STATUSES.ENROUTE) {
          throw new BadRequestException(WRONG_WAYPOINT_STATUS);
        }
        await manager.save(Object.assign(waypoint, {status}));
        break;
      case TRIP_WAYPOINT_STATUSES.SKIPPED:
        if (waypoint.status !== TRIP_WAYPOINT_STATUSES.NONE) {
          throw new BadRequestException(WRONG_WAYPOINT_STATUS);
        }
        await manager.save(Object.assign(waypoint, {status}));
        break;
      case TRIP_WAYPOINT_STATUSES.COMPLETED:
        if (waypoint.status !== TRIP_WAYPOINT_STATUSES.ARRIVED) {
          throw new BadRequestException(WRONG_WAYPOINT_STATUS);
        }
        await manager.save(Object.assign(waypoint, {status}));
        break;
    }

  }

  async txChangeTripWaypointPassengerStatusOrFail(passengerId: number, status: string, manager: EntityManager): Promise<void> {
    const tripPassenger = await manager.findOneOrFail(TripWaypointPassenger, {id: passengerId});

    if (tripPassenger.status !== TRIP_WAYPOINT_PASSENGER_STATUSES.NONE) {
      throw new BadRequestException(WRONG_WAYPOINT_PASSENGER_STATUS);
    }

    await manager.save(Object.assign(tripPassenger, {status}));
  }

  async txCreateTripDriverOrFail(tripId: number, driverId: number, manager: EntityManager): Promise<TripDriver> {
    const driver = await manager.createQueryBuilder(Driver, 'd')
      .leftJoinAndMapOne('d.account', Account, 'a', 'a.id = d.account_id')
      .leftJoinAndMapOne('d.partner', Partner, 'c', 'c.id = d.partner_id')
      .where(`d.id = :driverId`, {driverId})
      .getOne();

    if (!driver) {
      throw new BadRequestException('The driver is missing');
    }
    const tripDriver = Object.assign(new TripDriver(), {
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

  async txCreateTripVehicleOrFail(tripId: number, driverId: number, manager: EntityManager, vehicleId?: number): Promise<TripVehicle> {
    const params = {
      driver_id: driverId,
    };

    if (vehicleId) {
      (params as any).id = vehicleId;
    }

    const vehicle = await manager.findOneOrFail(Vehicle, params);

    const tripVehicle = Object.assign(new TripVehicle(),
      {
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

  async getCompletedTripsHistory(driver: Driver, client: ClientType, countDay?: number, pagination?: BasicPaginationDto)
      : Promise<MyTripsCompleteHistoryDto | void> {

    allowClientDriverOrFail(client);
    const alias = 't';
    const q = this.repository.createQueryBuilder(alias);
    const tripsDriver = await this.repositoryTripDriver.find({driver_id: driver.id});
    if (!tripsDriver.length) {
      return;
    }
    const tripIds = tripsDriver.map(driverTrip => driverTrip.trip_id);
    q.whereInIds(tripIds);
    q.andWhere(`${alias}.status = "serviced"`); // TODO enum with trip.entity
    if (!countDay) {
      super.applyPagination(q, alias, pagination);
    } else {
      q.andWhere(`${alias}.date_of_service >= DATE_ADD(CURDATE(), INTERVAL -:countDay DAY)`, {countDay});
    }
    const [items, count] = await q.getManyAndCount();
    if (!count) {
      return;
    }
    return {items, count};
  }

  async getNextUpcomingTrip(driver: Driver, client: ClientType): Promise<Trip | void> {

    allowClientDriverOrFail(client);
    const alias = 't';
    const q = this.repository.createQueryBuilder(alias);
    const tripsDriver = await this.repositoryTripDriver.find({driver_id: driver.id});
    if (!tripsDriver.length) {
      return;
    }
    const tripIds = tripsDriver.map(driverTrip => driverTrip.trip_id);
    q.innerJoin(sq => sq.select('min(date_of_service) as date_of_service')
      .from(Trip, 'bt')
      .where('bt.id IN (:tripIds)', {tripIds})
      .andWhere('date_of_service >= CURDATE()').andWhere('DATE(date_of_service) = DATE(CURDATE())')
      .andWhere(`status in (:tripStatus)`, {tripStatus: TRIP_ENTITY_STATUS_UPCOMING_LIST}), 'b', 't.date_of_service = b.date_of_service');
    this.findWithRelations(q);
    const trip = await q.getOne();
    if (!trip) {
      return;
    }
    return trip;
  }

  findWithRelations(qb?: SelectQueryBuilder<any>): SelectQueryBuilder<Trip> {
    const q = qb ? qb : this.repository.createQueryBuilder('t');
    return q
      .leftJoinAndMapOne('t.driver', TripDriver, 'd', 'd.trip_id = t.id AND d.is_switched != true')
      .leftJoinAndMapOne('t.driver_temp', Driver, 'dt', 'dt.id = d.driver_id')
      .leftJoinAndMapOne('d.partner', Partner, 'dp', 'dp.id = dt.partner_id')
      .leftJoinAndMapOne('d.account', Account, 'da', 'da.id = dt.account_id')
      .leftJoinAndMapOne('d.vehicle', TripVehicle, 'v', 'v.trip_id = t.id AND v.is_switched != true')
      .leftJoinAndMapOne('t.blueprint', RideBlueprint, 'bp', 'bp.id = t.ride_blueprint_id')
      .leftJoinAndMapMany('t.clients', RideClient, 'rc', 'rc.ride_route_id = t.ride_route_id')
      .leftJoinAndMapOne('rc.info', Client, 'c', 'c.id = rc.client_id')
      .leftJoinAndMapMany('t.places', TripPlace, 'p', 'p.trip_id = t.id')
      .leftJoinAndMapMany('t.passengers', TripPassenger, 'passenger', 'passenger.trip_id = t.id')
      .leftJoinAndMapMany('t.waypoints', TripWaypoint, 'w', 'w.trip_id = t.id')
      .leftJoinAndMapOne('w.arrival_trip_location', TripLocation, 'tla', 'w.arrival_trip_location_id = tla.id')
      .leftJoinAndMapOne('w.drop_off_trip_location', TripLocation, 'tld', 'w.drop_off_trip_location_id = tla.id')
      .leftJoinAndMapOne('w.pick_up_trip_location', TripLocation, 'tlp', 'w.pick_up_trip_location_id = tla.id')
      .leftJoinAndMapMany('w.passengers', TripWaypointPassenger, 'waypointPassenger', 'waypointPassenger.trip_waypoint_id = w.id')
      .where('t.is_deleted != true');
  }

  // arrival_trip_location, drop_off_trip_location, pick_up_trip_location
}
