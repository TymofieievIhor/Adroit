import { ControllerBase } from '../../common/helpers/controller.base';
import { Driver } from './driver.entity';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { FindDriverParamsDto } from './dto/find-driver-params.dto';
import { BankAccount } from '../bank-account/bank-account.entity';
import { BankAccountService } from '../bank-account/bank-account.service';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { FileService } from '../file/file.service';
import { File } from '../file/entities/file.entity';
import { TripDailyChecklist } from './trip-daily-checklist.entity';
export declare class DriverController extends ControllerBase<Driver> {
    protected service: DriverService;
    private bankAccountService;
    private fileService;
    constructor(service: DriverService, bankAccountService: BankAccountService, fileService: FileService);
    create(body: CreateDriverDto, req?: any): Promise<Driver>;
    find(params: FindDriverParamsDto, pagination: BasicPaginationDto): Promise<IResponseWithPagination<Driver>>;
    findMe(req: any): Promise<Driver>;
    findById(id: number): Promise<Driver>;
    findAll(id: number, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<BankAccount>>;
    updateById(id: number, body: UpdateDriverDto, req?: any): Promise<Driver>;
    findFiles(id: number, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<File>>;
    createTripDailyChecklist(req?: any): Promise<TripDailyChecklist>;
}
