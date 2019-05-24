import { PartnerService } from './partner.service';
import { Partner } from './partner.entity';
import { ControllerBase } from '../../common/helpers/controller.base';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { BankAccount } from '../bank-account/bank-account.entity';
import { BankAccountService } from '../bank-account/bank-account.service';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { File } from '../file/entities/file.entity';
import { FileService } from '../file/file.service';
import { SetArchivedStatusDto } from '../client/dto/set-archived-status.dto';
import { FindPartnerDto } from './dto/find-partner.dto';
export declare class PartnerController extends ControllerBase<Partner> {
    protected service: PartnerService;
    private bankAccountService;
    private fileService;
    constructor(service: PartnerService, bankAccountService: BankAccountService, fileService: FileService);
    findAll(id: number, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<BankAccount>>;
    find(params?: FindPartnerDto, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Partner>>;
    create(body: CreatePartnerDto, req?: any): Promise<Partner>;
    updateById(id: number, body: UpdatePartnerDto, req?: any): Promise<Partner>;
    findFiles(id: number, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<File>>;
    setArchiveDStatus(id: number, body: SetArchivedStatusDto): Promise<void>;
}
