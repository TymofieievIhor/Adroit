import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { ControllerBase } from '../../common/helpers/controller.base';
import { Trip } from './entities/trip.entity';
import { TripService } from './trip.service';
import { FindTripParamsDto } from './dto/find-trip-params.dto';
import { MyTripsCompleteHistoryDto } from './dto/my-trips-complete-history.dto';
export declare class TripController extends ControllerBase<Trip> {
    protected service: TripService;
    constructor(service: TripService);
    find(params: FindTripParamsDto, pagination: BasicPaginationDto): Promise<IResponseWithPagination<Trip>>;
    getCompletedHistory(req: any, countDay?: number, pagination?: BasicPaginationDto): Promise<MyTripsCompleteHistoryDto | void>;
    getNextTrip(req: any): Promise<any>;
}
