import { BadRequestException, Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { DriverLicense } from './driver-license.entity';
import { EntityManager, Repository, Transaction, TransactionManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDriverLicenseDto } from './dto/create-driver-license.dto';
import { LocationService } from '../location/location.service';
import { UpdateDriverLicenseDto } from './dto/update-driver-license.dto';
import { MISSING_RECORD } from '../../common/error-handling/exception-messages';

@Injectable()
export class DriverLicenseService extends ServiceBase<DriverLicense> {
  constructor(@InjectRepository(DriverLicense) protected readonly repository: Repository<DriverLicense>,
              private locationService: LocationService) {
    super(DriverLicense, repository);
  }

  @Transaction()
  async create(data: CreateDriverLicenseDto, @TransactionManager() manager?: EntityManager): Promise<DriverLicense> {
    return await this.createInTxChain(data, manager);
  }

  async createInTxChain(data: CreateDriverLicenseDto, manager?: EntityManager | Repository<DriverLicense>): Promise<DriverLicense> {
    const location = await this.locationService.create(data.location);
    let driverLicense = Object.assign(new DriverLicense(), data.driver_license);
    driverLicense.location_id = location.id;
    driverLicense = await manager.save(driverLicense);
    driverLicense.location = location;
    return driverLicense;
  }

  @Transaction()
  async updateById(id: number, data: UpdateDriverLicenseDto, @TransactionManager() manager?: EntityManager): Promise<DriverLicense> {
    return await this.updateByIdInTxChain(id, data, manager);
  }

  async updateByIdInTxChain(id: number, data: UpdateDriverLicenseDto, manager?: EntityManager): Promise<DriverLicense> {
    let driverLicense = await manager.findOne(DriverLicense, {id});
    if (!driverLicense) {
      throw new BadRequestException(MISSING_RECORD);
    }
    let location;
    if (data.location && Object.keys(data.location).length) {
      location = await this.locationService.updateByIdNoLink(driverLicense.location_id, data.location, manager);
      driverLicense.location_id = location.id;
    }
    if (data.driver_license && Object.keys(data.driver_license).length) {
      driverLicense = Object.assign(driverLicense, data.driver_license);
    }

    await manager.save(DriverLicense, Object.assign(new DriverLicense(), driverLicense));
    driverLicense.location = location || {};
    return driverLicense;
  }
}
