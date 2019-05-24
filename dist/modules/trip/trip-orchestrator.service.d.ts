import { ServiceBase } from '../../common/helpers/service.base';
import { Trip } from './entities/trip.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateDailyRecurringTripDto } from './dto/create-daily-recurring-trip.dto';
import { LocationService } from '../location/location.service';
import { TripService } from './trip.service';
import { TripMutatorService } from './trip-mutator.service';
export declare class TripOrchestratorService extends ServiceBase<Trip> {
    protected readonly repository: Repository<Trip>;
    private locationService;
    private tripService;
    private tripMutatorService;
    constructor(repository: Repository<Trip>, locationService: LocationService, tripService: TripService, tripMutatorService: TripMutatorService);
    private readonly recurringDays;
    createDailyRecurringTrip(data: CreateDailyRecurringTripDto, manager?: EntityManager): Promise<Trip>;
}
