import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { Driver } from '../driver/driver.entity';
import { TripDriver } from './entities/trip-driver.entity';
import { TripVehicle } from './entities/trip-vehicle.entity';
import { Trip } from './entities/trip.entity';
import { ServiceBase } from '../../common/helpers/service.base';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { FindTripParamsDto } from './dto/find-trip-params.dto';
import { MyTripsCompleteHistoryDto } from './dto/my-trips-complete-history.dto';
import { ClientType } from '../client-type/client-type.entity';
import { TripActions } from '../../common/helpers/trip/typeTripStatus';
export declare class TripService extends ServiceBase<Trip> {
    protected repository: Repository<Trip>;
    protected readonly repositoryTripDriver: Repository<TripDriver>;
    constructor(repository: Repository<Trip>, repositoryTripDriver: Repository<TripDriver>);
    find(params?: FindTripParamsDto, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Trip>>;
    txChangeTripDriverOrFail({ tripId, currentDriverId, newDriverId }: {
        tripId: any;
        currentDriverId: any;
        newDriverId: any;
    }, manager: EntityManager, accountId?: number): Promise<void>;
    txChangeTripVehicleOrFail({ tripId, currentVehicleId, newVehicleId, currentDriverId, newDriverId }: {
        tripId: any;
        currentVehicleId: any;
        newVehicleId: any;
        currentDriverId: any;
        newDriverId: any;
    }, manager: EntityManager, accountId?: number): Promise<void>;
    txChangeTripStatusOrFail(tripId: number, status: TripActions, manager: EntityManager): Promise<void>;
    txChangeTripWaypointStatusOrFail(waypointId: number, status: string, manager: EntityManager): Promise<void>;
    txChangeTripWaypointPassengerStatusOrFail(passengerId: number, status: string, manager: EntityManager): Promise<void>;
    txCreateTripDriverOrFail(tripId: number, driverId: number, manager: EntityManager): Promise<TripDriver>;
    txCreateTripVehicleOrFail(tripId: number, driverId: number, manager: EntityManager, vehicleId?: number): Promise<TripVehicle>;
    getCompletedTripsHistory(driver: Driver, client: ClientType, countDay?: number, pagination?: BasicPaginationDto): Promise<MyTripsCompleteHistoryDto | void>;
    getNextUpcomingTrip(driver: Driver, client: ClientType): Promise<Trip | void>;
    findWithRelations(qb?: SelectQueryBuilder<any>): SelectQueryBuilder<Trip>;
}
