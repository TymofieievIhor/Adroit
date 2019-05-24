import { ServiceBase } from '../../common/helpers/service.base';
import { DriverLicense } from './driver-license.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateDriverLicenseDto } from './dto/create-driver-license.dto';
import { LocationService } from '../location/location.service';
import { UpdateDriverLicenseDto } from './dto/update-driver-license.dto';
export declare class DriverLicenseService extends ServiceBase<DriverLicense> {
    protected readonly repository: Repository<DriverLicense>;
    private locationService;
    constructor(repository: Repository<DriverLicense>, locationService: LocationService);
    create(data: CreateDriverLicenseDto, manager?: EntityManager): Promise<DriverLicense>;
    createInTxChain(data: CreateDriverLicenseDto, manager?: EntityManager | Repository<DriverLicense>): Promise<DriverLicense>;
    updateById(id: number, data: UpdateDriverLicenseDto, manager?: EntityManager): Promise<DriverLicense>;
    updateByIdInTxChain(id: number, data: UpdateDriverLicenseDto, manager?: EntityManager): Promise<DriverLicense>;
}
