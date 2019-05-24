import { ServiceBase } from '../../common/helpers/service.base';
import { Passenger } from './passenger.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { LocationService } from '../location/location.service';
import { ContactService } from '../contact/contact.service';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { GuardianService } from '../guardian/guardian.service';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { SetArchivedStatusDto } from '../client/dto/set-archived-status.dto';
import { UtilsService } from '../../common/utils/utils.service';
import { FindPassengerParamsDto } from './dto/find-passenger-params.dto';
export declare class PassengerService extends ServiceBase<Passenger> {
    protected repository: Repository<Passenger>;
    private locationService;
    private contactService;
    private guardianService;
    private utilsService;
    constructor(repository: Repository<Passenger>, locationService: LocationService, contactService: ContactService, guardianService: GuardianService, utilsService: UtilsService<Passenger>);
    create(data: CreatePassengerDto, manager?: EntityManager): Promise<Passenger>;
    updateById(id: number, data: UpdatePassengerDto, manager?: EntityManager): Promise<Passenger>;
    findById(id: number): Promise<Passenger>;
    find(body?: FindPassengerParamsDto, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Passenger>>;
    private modifyContactsGuardians;
    setArchivedStatusById(id: number, body: SetArchivedStatusDto): Promise<void>;
    findPassengersByClientId(clientId: number): Promise<Passenger[]>;
    private findWithRelations;
}
