import { ControllerBase } from '../../common/helpers/controller.base';
import { Passenger } from './passenger.entity';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { SetArchivedStatusDto } from '../client/dto/set-archived-status.dto';
import { FindPassengerParamsDto } from './dto/find-passenger-params.dto';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
export declare class PassengerController extends ControllerBase<Passenger> {
    protected service: PassengerService;
    constructor(service: PassengerService);
    create(body: CreatePassengerDto): Promise<Passenger>;
    updateById(id: number, body: UpdatePassengerDto, req?: any): Promise<Passenger>;
    setArchiveDStatus(id: number, body: SetArchivedStatusDto): Promise<void>;
    find(params?: FindPassengerParamsDto, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Passenger>>;
    findPassengersByClientId(clientId: number): Promise<Passenger[]>;
}
