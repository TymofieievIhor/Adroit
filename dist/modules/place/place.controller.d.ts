import { ControllerBase } from '../../common/helpers/controller.base';
import { Place } from './entities/place.entity';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { FindPlaceParamsDto } from './dto/find-place-params.dto';
import { SetArchivedStatusDto } from '../client/dto/set-archived-status.dto';
export declare class PlaceController extends ControllerBase<Place> {
    protected service: PlaceService;
    constructor(service: PlaceService);
    create(body: CreatePlaceDto): Promise<Place>;
    find(params: FindPlaceParamsDto, pagination: BasicPaginationDto): Promise<IResponseWithPagination<Place>>;
    setArchiveDStatus(id: number, body: SetArchivedStatusDto): Promise<void>;
}
