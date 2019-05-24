import { TripOrchestratorService } from './trip-orchestrator.service';
import { Trip } from './entities/trip.entity';
import { CreateDailyRecurringTripDto } from './dto/create-daily-recurring-trip.dto';
import { TripMutatorService } from './trip-mutator.service';
import { ActionDto } from './trip-mutator-dto/action.dto';
import { TripModification } from './entities/trip-modification.entity';
export declare class TripOrchestratorController {
    protected service: TripOrchestratorService;
    protected serviceMutator: TripMutatorService;
    constructor(service: TripOrchestratorService, serviceMutator: TripMutatorService);
    createDailyRecurringTrip(body: CreateDailyRecurringTripDto): Promise<Trip>;
    getActionList(): Promise<string[]>;
    changeTripStatus(body: ActionDto, tripId: number): Promise<TripModification>;
}
