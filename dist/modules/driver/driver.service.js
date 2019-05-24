"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const service_base_1 = require("../../common/helpers/service.base");
const driver_entity_1 = require("./driver.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const create_driver_dto_1 = require("./dto/create-driver.dto");
const bank_account_service_1 = require("../bank-account/bank-account.service");
const partner_service_1 = require("../partner/partner.service");
const vehicle_service_1 = require("../vehicle/vehicle.service");
const bank_account_entity_1 = require("../bank-account/bank-account.entity");
const driver_license_service_1 = require("../driver-license/driver-license.service");
const account_service_1 = require("../account/account.service");
const update_driver_dto_1 = require("./dto/update-driver.dto");
const account_entity_1 = require("../account/account.entity");
const vehicle_entity_1 = require("../vehicle/vehicle.entity");
const driver_license_entity_1 = require("../driver-license/driver-license.entity");
const partner_entity_1 = require("../partner/partner.entity");
const location_entity_1 = require("../location/location.entity");
const vehicle_insurance_entity_1 = require("../vehicle-insurance/vehicle-insurance.entity");
const file_service_1 = require("../file/file.service");
const account_type_entity_1 = require("../account-type/account-type.entity");
const driver_file_entity_1 = require("../file/entities/driver-file.entity");
const fileUtils_1 = require("../file/fileUtils");
const exception_messages_1 = require("../../common/error-handling/exception-messages");
const constant_1 = require("./constant");
const trip_daily_checklist_entity_1 = require("./trip-daily-checklist.entity");
const constant_2 = require("../api-client/constant");
const constant_3 = require("../../common/helpers/constant");
let DriverService = class DriverService extends service_base_1.ServiceBase {
    constructor(repository, repositoryTripDailyChecklist, bankAccountService, partnerService, vehicleService, driverLicenseService, accountService, fileService, fileUtils) {
        super(driver_entity_1.Driver, repository);
        this.repository = repository;
        this.repositoryTripDailyChecklist = repositoryTripDailyChecklist;
        this.bankAccountService = bankAccountService;
        this.partnerService = partnerService;
        this.vehicleService = vehicleService;
        this.driverLicenseService = driverLicenseService;
        this.accountService = accountService;
        this.fileService = fileService;
        this.fileUtils = fileUtils;
    }
    async findById(id) {
        const q = this.findWithRelations('d');
        q
            .andWhere('d.id = :id', { id });
        return await q.getOne();
    }
    async findByAccountId(account_id) {
        const q = this.repository.createQueryBuilder('d')
            .where('d.account_id = :account_id', { account_id })
            .leftJoinAndMapOne('d.account', account_entity_1.Account, 'a', 'a.id = d.account_id')
            .leftJoinAndMapOne('d.vehicle', vehicle_entity_1.Vehicle, 'v', 'v.driver_id = d.id');
        const driver = await q.getOne();
        driver.latest_trip_daily_checklist = await this.repositoryTripDailyChecklist.createQueryBuilder('tl')
            .where('tl.driver_id = :id', { id: driver.id })
            .orderBy('tl.confirmed_date', 'DESC')
            .getOne();
        return driver;
    }
    async find(params, pagination) {
        const alias = 'd';
        const q = this.findWithRelations(alias);
        const accountFields = ['first_name', 'last_name', 'email', 'phone_number'];
        const driverFields = ['partner_id', 'ssn'];
        for (const key of Object.keys(params)) {
            if (accountFields.includes(key)) {
                q.andWhere(`account.${key} LIKE '%${params[key]}%'`);
            }
            else if (driverFields.includes(key)) {
                q.andWhere(`d.${key} = :${key}`, params);
            }
        }
        super.applyPagination(q, alias, pagination);
        const [items, count] = await q.getManyAndCount();
        return { items, count };
    }
    async create(data, manager) {
        data.driver.date_of_birth = super.convertDateTimeToDateStringFormat(data.driver.date_of_birth);
        let driver = Object.assign(new driver_entity_1.Driver(), data.driver);
        let bankAccount = await this.bankAccountService.create(data.bank_account, manager);
        const partner = await this.partnerService.findById(data.driver.partner_id);
        if (!partner) {
            throw new common_1.BadRequestException(exception_messages_1.MISSING_RECORD);
        }
        const account = await this.accountService.create(Object.assign({}, data.account, { account_type_id: 8 }), manager);
        const driverLicense = await this.driverLicenseService.createInTxChain(data.driver_license, manager);
        driver.driver_license_id = driverLicense.id;
        driver.bank_account_id = bankAccount.id;
        driver.account_id = account.id;
        driver = await manager.save(driver);
        bankAccount = await manager.save(bank_account_entity_1.BankAccount, Object.assign(bankAccount, { driver_id: driver.id }));
        if (data.files && data.files.length) {
            await this.fileUtils.modifyFileLink(data.files, { name: 'driver', id: driver.id }, data.account_id, manager);
        }
        driver.vehicles = [await this.vehicleService.createInTxChain(data.vehicle, manager, driver.id)];
        driver.bank_account = bankAccount;
        driver.driver_license = driverLicense;
        driver.partner = partner;
        driver.account = account;
        driver.files = (await this.fileService.findFilesByOwner(driver.id, 'driver')).items;
        return driver;
    }
    async updateById(id, data, manager) {
        let driver = await manager.findOne(driver_entity_1.Driver, { id });
        if (!driver) {
            throw new common_1.BadRequestException('The driver is missing');
        }
        let bankAccount = await this.bankAccountService.findById(driver.bank_account_id);
        let driverLicense = await this.driverLicenseService.findById(driver.driver_license_id);
        let vehicle = await this.vehicleService.findOne({ driver_id: driver.id });
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
            driver = await manager.save(driver_entity_1.Driver, Object.assign(driver, data.driver));
        }
        if (data.files) {
            await this.fileUtils.modifyFileLink(data.files, { name: 'driver', id: driver.id }, data.account_id, manager);
        }
        driver.partner = await this.partnerService.findById(driver.partner_id);
        driver.driver_license = driverLicense;
        driver.bank_account = bankAccount;
        driver.vehicles = [vehicle];
        driver.files = (await this.fileService.findFilesByOwner(driver.id, 'driver')).items;
        return driver;
    }
    async getExistingDriverByAccountIdOrFail(account_id) {
        const d = await this.repository
            .createQueryBuilder('d')
            .where('d.account_id = :account_id', { account_id })
            .andWhere('d.is_suspended != true')
            .andWhere('d.is_deleted != true')
            .getOne();
        if (!d) {
            throw new common_1.NotFoundException(constant_1.EXC_DRIVER_NOT_FOUND);
        }
        return d;
    }
    findWithRelations(alias) {
        return this.repository.createQueryBuilder(alias)
            .leftJoinAndMapOne(`${alias}.account`, account_entity_1.Account, 'account', `account.id = ${alias}.account_id`)
            .leftJoinAndMapMany(`${alias}.vehicles`, vehicle_entity_1.Vehicle, 'vehicle', `vehicle.driver_id = ${alias}.id`)
            .leftJoinAndMapOne(`${alias}.bank_account`, bank_account_entity_1.BankAccount, 'bank_account', `bank_account.id = ${alias}.bank_account_id`)
            .leftJoinAndMapOne(`${alias}.driver_license`, driver_license_entity_1.DriverLicense, 'driver_license', `driver_license.id = ${alias}.driver_license_id`)
            .leftJoinAndMapOne('driver_license.location', location_entity_1.LocationEntity, 'location', 'location.id = driver_license.location_id')
            .leftJoinAndMapOne('vehicle.vehicle_insurance', vehicle_insurance_entity_1.VehicleInsurance, 'vehicle_insurance', 'vehicle.vehicle_insurance_id = vehicle_insurance.id')
            .leftJoinAndMapOne(`${alias}.partner`, partner_entity_1.Partner, 'partner', `partner.id = ${alias}.partner_id`)
            .leftJoinAndMapOne('account.account_type', account_type_entity_1.AccountType, 'account_type', 'account_type.id = account.account_type_id')
            .leftJoinAndMapMany(`${alias}.files`, driver_file_entity_1.DriverFile, 'file', `${alias}.id = file.driver_id AND file.is_deleted != true`)
            .where(`${alias}.is_deleted != true`)
            .andWhere(`account.is_deleted != true`);
    }
    async createTripDailyChecklist(driver, client, ip) {
        if (!(client.text_value === constant_2.API_CLIENT_TYPE.adroit_driver_android || client.text_value === constant_2.API_CLIENT_TYPE.adroit_driver_ios)) {
            throw new common_1.NotFoundException(constant_3.EXC_ENDPOINT_ACCESS_ERROR);
        }
        const checklist = Object.assign(new trip_daily_checklist_entity_1.TripDailyChecklist(), {
            driver_id: driver.id,
            api_client: client.id,
            confirmation_ip: ip,
        });
        return await this.repositoryTripDailyChecklist.save(checklist);
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_driver_dto_1.CreateDriverDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], DriverService.prototype, "create", null);
__decorate([
    typeorm_1.Transaction(),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_driver_dto_1.UpdateDriverDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], DriverService.prototype, "updateById", null);
DriverService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(driver_entity_1.Driver)),
    __param(1, typeorm_2.InjectRepository(trip_daily_checklist_entity_1.TripDailyChecklist)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        bank_account_service_1.BankAccountService,
        partner_service_1.PartnerService,
        vehicle_service_1.VehicleService,
        driver_license_service_1.DriverLicenseService,
        account_service_1.AccountService,
        file_service_1.FileService,
        fileUtils_1.FileUtils])
], DriverService);
exports.DriverService = DriverService;
//# sourceMappingURL=driver.service.js.map