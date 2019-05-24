import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { Driver } from './driver.entity';
import { Column, EntityManager, Repository, SelectQueryBuilder, Transaction, TransactionManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { BankAccountService } from '../bank-account/bank-account.service';
import { PartnerService } from '../partner/partner.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { BankAccount } from '../bank-account/bank-account.entity';
import { DriverLicenseService } from '../driver-license/driver-license.service';
import { AccountService } from '../account/account.service';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { FindDriverParamsDto } from './dto/find-driver-params.dto';
import { Account } from '../account/account.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { DriverLicense } from '../driver-license/driver-license.entity';
import { Partner } from '../partner/partner.entity';
import { LocationEntity } from '../location/location.entity';
import { VehicleInsurance } from '../vehicle-insurance/vehicle-insurance.entity';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { FileService } from '../file/file.service';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { AccountType } from '../account-type/account-type.entity';
import { DriverFile } from '../file/entities/driver-file.entity';
import { FileUtils } from '../file/fileUtils';
import { MISSING_RECORD } from '../../common/error-handling/exception-messages';
import { EXC_DRIVER_NOT_FOUND } from './constant';
import { TripDailyChecklist } from './trip-daily-checklist.entity';
import { ApiClient } from '../api-client/api-client.entity';
import { API_CLIENT_TYPE } from '../api-client/constant';
import { EXC_ENDPOINT_ACCESS_ERROR } from '../../common/helpers/constant';

@Injectable()
export class DriverService extends ServiceBase<Driver>{
  constructor(@InjectRepository(Driver) protected readonly repository: Repository<Driver>,
              @InjectRepository(TripDailyChecklist) protected readonly repositoryTripDailyChecklist: Repository<TripDailyChecklist>,
              private bankAccountService: BankAccountService,
              private partnerService: PartnerService,
              private vehicleService: VehicleService,
              private driverLicenseService: DriverLicenseService,
              private accountService: AccountService,
              private fileService: FileService,
              private fileUtils: FileUtils,
              ) {
    super(Driver, repository);
  }

  async findById(id: number): Promise<Driver> {
    const q = this.findWithRelations('d');
    q
      .andWhere('d.id = :id', {id});
    return await q.getOne();
  }

  async findByAccountId(account_id: number): Promise<Driver> {
    const q = this.repository.createQueryBuilder('d')
      .where('d.account_id = :account_id', { account_id })
      .leftJoinAndMapOne('d.account', Account, 'a', 'a.id = d.account_id')
      .leftJoinAndMapOne('d.vehicle', Vehicle, 'v', 'v.driver_id = d.id');
    const driver = await q.getOne();
    (driver as any).latest_trip_daily_checklist = await this.repositoryTripDailyChecklist.createQueryBuilder('tl')
      .where('tl.driver_id = :id', { id: driver.id })
      .orderBy('tl.confirmed_date', 'DESC')
      .getOne();
    return driver;
  }

  async find(params: FindDriverParamsDto, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Driver>> {
    const alias = 'd';
    const q = this.findWithRelations(alias);
    const accountFields = ['first_name', 'last_name', 'email', 'phone_number'];
    const driverFields = ['partner_id', 'ssn'];
    for (const key of Object.keys(params)) {
      if (accountFields.includes(key)) {
        q.andWhere(`account.${key} LIKE '%${params[key]}%'`);
      } else if (driverFields.includes(key)) {
        q.andWhere(`d.${key} = :${key}`, params);
      }
    }
    super.applyPagination(q, alias, pagination);
    const [items, count] = await q.getManyAndCount();
    return {items, count};
  }

  @Transaction()
  async create(data: CreateDriverDto, @TransactionManager() manager?: EntityManager): Promise<Driver> {
    data.driver.date_of_birth = super.convertDateTimeToDateStringFormat(data.driver.date_of_birth);
    let driver: Driver = Object.assign(new Driver(), data.driver);
    let bankAccount: BankAccount = await this.bankAccountService.create(data.bank_account, manager);
    const partner: Partner = await this.partnerService.findById(data.driver.partner_id);
    if (!partner) {
      throw new BadRequestException(MISSING_RECORD);
    }
    const account = await this.accountService.create(Object.assign({}, data.account, {account_type_id: 8}), manager);
    const driverLicense = await this.driverLicenseService.createInTxChain(data.driver_license, manager);
    driver.driver_license_id = driverLicense.id;
    driver.bank_account_id = bankAccount.id;
    driver.account_id = account.id;
    driver = await manager.save(driver);
    bankAccount = await manager.save(BankAccount, Object.assign(bankAccount, {driver_id: driver.id}));
    if (data.files && data.files.length) {
      await this.fileUtils.modifyFileLink(data.files, {name: 'driver', id: driver.id}, data.account_id, manager);
    }
    driver.vehicles = [await this.vehicleService.createInTxChain(data.vehicle, manager, driver.id)];
    driver.bank_account = bankAccount;
    driver.driver_license = driverLicense;
    driver.partner = partner;
    driver.account = account;
    driver.files = (await this.fileService.findFilesByOwner(driver.id, 'driver')).items;
    return driver;
  }

  @Transaction()
  async updateById(id: number, data: UpdateDriverDto, @TransactionManager() manager?: EntityManager): Promise<Driver> {
    let driver = await manager.findOne(Driver, {id});
    if (!driver) {
      throw new BadRequestException('The driver is missing');
    }
    let bankAccount = await this.bankAccountService.findById(driver.bank_account_id);
    let driverLicense = await this.driverLicenseService.findById(driver.driver_license_id);
    let vehicle = await this.vehicleService.findOne({driver_id: driver.id});
    if (data.bank_account && Object.keys(data.bank_account).length) {
      bankAccount = await this.bankAccountService.updateByIdInTxChain(bankAccount.id, data.bank_account, manager);
      driver.bank_account_id = bankAccount.id;
    }
    if (data.driver_license && Object.keys(data.driver_license).length) {
      driverLicense = await this.driverLicenseService.updateByIdInTxChain(driverLicense.id, data.driver_license, manager);
    }

    if (data.vehicle && Object.keys(data.vehicle).length) {
      vehicle = await this.vehicleService.updateByIdInTxChain(vehicle.id, data.vehicle, manager);
    }

    if (data.driver && Object.keys(data.driver).length) {
      if (data.driver.date_of_birth) {
        data.driver.date_of_birth = super.convertDateTimeToDateStringFormat(data.driver.date_of_birth);
      }
      driver = await manager.save(Driver, Object.assign(driver, data.driver));
    }

    if (data.files) {
      await this.fileUtils.modifyFileLink(data.files, {name: 'driver', id: driver.id}, data.account_id, manager);
    }

    driver.partner = await this.partnerService.findById(driver.partner_id);
    driver.driver_license = driverLicense;
    driver.bank_account = bankAccount;
    driver.vehicles = [vehicle];
    driver.files = (await this.fileService.findFilesByOwner(driver.id, 'driver')).items;
    return driver;
  }

  async getExistingDriverByAccountIdOrFail(account_id: number): Promise<Driver> {
    const d = await this.repository
      .createQueryBuilder('d')
      .where('d.account_id = :account_id', { account_id })
      .andWhere('d.is_suspended != true')
      .andWhere('d.is_deleted != true')
      .getOne();
    if (!d) {
      throw new NotFoundException(EXC_DRIVER_NOT_FOUND);
    }
    return d;
  }

  private findWithRelations(alias: string): SelectQueryBuilder<Driver> {
    return this.repository.createQueryBuilder(alias)
      .leftJoinAndMapOne(`${alias}.account`, Account, 'account', `account.id = ${alias}.account_id`)
      .leftJoinAndMapMany(`${alias}.vehicles`, Vehicle, 'vehicle', `vehicle.driver_id = ${alias}.id`)
      .leftJoinAndMapOne(`${alias}.bank_account`, BankAccount, 'bank_account', `bank_account.id = ${alias}.bank_account_id`)
      .leftJoinAndMapOne(
        `${alias}.driver_license`, DriverLicense, 'driver_license', `driver_license.id = ${alias}.driver_license_id`)
      .leftJoinAndMapOne('driver_license.location', LocationEntity, 'location', 'location.id = driver_license.location_id')
      .leftJoinAndMapOne('vehicle.vehicle_insurance', VehicleInsurance, 'vehicle_insurance', 'vehicle.vehicle_insurance_id = vehicle_insurance.id')
      .leftJoinAndMapOne(`${alias}.partner`, Partner, 'partner', `partner.id = ${alias}.partner_id`)
      .leftJoinAndMapOne('account.account_type', AccountType, 'account_type', 'account_type.id = account.account_type_id')
      .leftJoinAndMapMany(`${alias}.files`, DriverFile, 'file', `${alias}.id = file.driver_id AND file.is_deleted != true`)
      .where(`${alias}.is_deleted != true`)

      .andWhere(`account.is_deleted != true`);
  }

  async createTripDailyChecklist( driver: Driver, client: ApiClient, ip: string ): Promise<TripDailyChecklist>{
    if (!(client.text_value === API_CLIENT_TYPE.adroit_driver_android || client.text_value === API_CLIENT_TYPE.adroit_driver_ios)) {
      throw new NotFoundException(EXC_ENDPOINT_ACCESS_ERROR);
    }
    const checklist = Object.assign(new TripDailyChecklist(), {
      driver_id: driver.id,
      api_client: client.id,
      confirmation_ip: ip,
    });
    return await this.repositoryTripDailyChecklist.save(checklist);
  }
}
