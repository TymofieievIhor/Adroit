import { ServiceBase } from '../../common/helpers/service.base';
import { Place } from './entities/place.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { LocationService } from '../location/location.service';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { FindPlaceParamsDto } from './dto/find-place-params.dto';
import { SetArchivedStatusDto } from '../client/dto/set-archived-status.dto';
import { UtilsService } from '../../common/utils/utils.service';
import { TimeZoneService } from '../time-zone/time-zone.service';
export declare class PlaceService extends ServiceBase<Place> {
    protected repository: Repository<Place>;
    private locationService;
    private utilsService;
    private timeZoneService;
    constructor(repository: Repository<Place>, locationService: LocationService, utilsService: UtilsService<Place>, timeZoneService: TimeZoneService);
    create(data: CreatePlaceDto, manager?: EntityManager): Promise<Place>;
    find(body: FindPlaceParamsDto, pagination: BasicPaginationDto): Promise<IResponseWithPagination<Place>>;
    findById(id: number): Promise<Place>;
    updateById(id: number, data: UpdatePlaceDto, manager?: EntityManager): Promise<Place>;
    setArchivedStatusById(id: number, body: SetArchivedStatusDto): Promise<void>;
    private findWithRelations;
}
