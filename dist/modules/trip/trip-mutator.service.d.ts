import { EntityManager } from 'typeorm';
import { ActionDto } from './trip-mutator-dto/action.dto';
import { TripService } from './trip.service';
import { TripModification } from './entities/trip-modification.entity';
import { AccountService } from '../account/account.service';
export declare class TripMutatorService {
    private tripService;
    private accountService;
    constructor(tripService: TripService, accountService: AccountService);
    getActionList(): string[];
    dispatch(tripId: number, action: ActionDto, manager?: EntityManager): Promise<TripModification>;
    private txCheckAndSetTripStausCanceledOrFail;
    private txCheckAndSetWaypointStatusesSkippedOrFail;
    private txCreateSnapshotOrFail;
    private compareObjects;
}
