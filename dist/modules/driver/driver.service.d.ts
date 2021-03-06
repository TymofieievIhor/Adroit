import { ServiceBase } from '../../common/helpers/service.base';
import { Driver } from './driver.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { BankAccountService } from '../bank-account/bank-account.service';
import { PartnerService } from '../partner/partner.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { DriverLicenseService } from '../driver-license/driver-license.service';
import { AccountService } from '../account/account.service';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { FindDriverParamsDto } from './dto/find-driver-params.dto';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { FileService } from '../file/file.service';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { FileUtils } from '../file/fileUtils';
import { TripDailyChecklist } from './trip-daily-checklist.entity';
import { ApiClient } from '../api-client/api-client.entity';
export declare class DriverService extends ServiceBase<Driver> {
    protected readonly repository: Repository<Driver>;
    protected readonly repositoryTripDailyChecklist: Repository<TripDailyChecklist>;
    private bankAccountService;
    private partnerService;
    private vehicleService;
    private driverLicenseService;
    private accountService;
    private fileService;
    private fileUtils;
    constructor(repository: Repository<Driver>, repositoryTripDailyChecklist: Repository<TripDailyChecklist>, bankAccountService: BankAccountService, partnerService: PartnerService, vehicleService: VehicleService, driverLicenseService: DriverLicenseService, accountService: AccountService, fileService: FileService, fileUtils: FileUtils);
    findById(id: number): Promise<Driver>;
    findByAccountId(account_id: number): Promise<Driver>;
    find(params: FindDriverParamsDto, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Driver>>;
    create(data: CreateDriverDto, manager?: EntityManager): Promise<Driver>;
    updateById(id: number, data: UpdateDriverDto, manager?: EntityManager): Promise<Driver>;
    getExistingDriverByAccountIdOrFail(account_id: number): Promise<Driver>;
    private findWithRelations;
    createTripDailyChecklist(driver: Driver, client: ApiClient, ip: string): Promise<TripDailyChecklist>;
}
