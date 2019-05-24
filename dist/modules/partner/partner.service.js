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
const typeorm_1 = require("typeorm");
const partner_entity_1 = require("./partner.entity");
const typeorm_2 = require("@nestjs/typeorm");
const service_base_1 = require("../../common/helpers/service.base");
const create_partner_dto_1 = require("./dto/create-partner.dto");
const location_service_1 = require("../location/location.service");
const bank_account_service_1 = require("../bank-account/bank-account.service");
const account_service_1 = require("../account/account.service");
const update_partner_dto_1 = require("./dto/update-partner.dto");
const account_entity_1 = require("../account/account.entity");
const bank_account_entity_1 = require("../bank-account/bank-account.entity");
const location_entity_1 = require("../location/location.entity");
const file_service_1 = require("../file/file.service");
const driver_entity_1 = require("../driver/driver.entity");
const partner_file_entity_1 = require("../file/entities/partner-file.entity");
const fileUtils_1 = require("../file/fileUtils");
const utils_service_1 = require("../../common/utils/utils.service");
let PartnerService = class PartnerService extends service_base_1.ServiceBase {
    constructor(repository, locationService, bankAccountService, accountService, fileService, fileUtils, utilsService) {
        super(partner_entity_1.Partner, repository);
        this.repository = repository;
        this.locationService = locationService;
        this.bankAccountService = bankAccountService;
        this.accountService = accountService;
        this.fileService = fileService;
        this.fileUtils = fileUtils;
        this.utilsService = utilsService;
    }
    async create(data, manager) {
        const partner = Object.assign(new partner_entity_1.Partner(), data.partner);
        const location = await this.locationService.create(data.location, manager, 'partner');
        const account = await this.accountService.create(Object.assign({}, data.owner_account, { account_type_id: 7 }), manager);
        let bankAccount;
        if (data.bank_account) {
            bankAccount = await this.bankAccountService.create(data.bank_account, manager);
            partner.bank_account_id = bankAccount.id;
        }
        partner.location_id = location.id;
        partner.owner_account_id = account.id;
        const partnerSaved = await manager.save(partner);
        if (data.bank_account) {
            bankAccount = await manager.save(bank_account_entity_1.BankAccount, Object.assign(bankAccount, { partner_id: partnerSaved.id }));
        }
        await this.locationService.createLink({ name: 'partner', id: partnerSaved.id }, partner.location_id, manager);
        if (data.files && data.files.length) {
            await this.fileUtils.modifyFileLink(data.files, { name: 'partner', id: partnerSaved.id }, data.account_id, manager);
        }
        partnerSaved.location = location;
        partnerSaved.bank_account = bankAccount || null;
        partnerSaved.owner_account = account;
        partnerSaved.files = (await this.fileService.findFilesByOwner(partnerSaved.id, 'partner')).items;
        return partnerSaved;
    }
    async updateById(id, data, manager) {
        let partner = await manager.findOne(partner_entity_1.Partner, { id, is_deleted: false, is_archived: false });
        if (!partner) {
            throw new common_1.BadRequestException('The partner does not exist');
        }
        if (data.partner && Object.keys(data.partner).length) {
            if (data.partner.name) {
                partner.name = data.partner.name;
            }
            if (data.partner.tin) {
                partner.tin = data.partner.tin;
            }
        }
        let newLoc;
        let newBankAcc;
        if (data.location && Object.keys(data.location).length) {
            const location = await this.locationService.findById(partner.location_id);
            newLoc = await this.locationService.updateByIdInTxChain(location.id, data.location, { name: 'partner', id: partner.id }, manager);
            partner.location_id = newLoc.id;
        }
        if (data.bank_account && Object.keys(data.bank_account).length) {
            const bankAccount = await this.bankAccountService.findById(partner.bank_account_id);
            newBankAcc = await this.bankAccountService.updateByIdInTxChain(bankAccount.id, data.bank_account, manager);
            partner.bank_account_id = newBankAcc.id;
        }
        partner = await manager.save(partner);
        partner.id = id;
        if (data.files) {
            await this.fileUtils.modifyFileLink(data.files, { name: 'partner', id: partner.id }, data.account_id, manager);
        }
        if (newLoc) {
            partner.location = newLoc;
        }
        if (newBankAcc) {
            partner.bank_account = newBankAcc;
        }
        partner.files = (await this.fileService.findFilesByOwner(partner.id, 'partner')).items;
        return partner;
    }
    async findById(id) {
        const q = this.findWithRelations('t')
            .andWhere('t.id = :id', { id });
        return await q.getOne();
    }
    async find(params, pagination) {
        const alias = 't';
        const customFindWithRelations = this.findWithRelations(alias);
        if (params && params.search) {
            if (!isNaN(+params.search)) {
                customFindWithRelations
                    .andWhere(`${alias}.id = :id`, { id: +params.search })
                    .orWhere(`owner_account.phone_number LIKE '%${+params.search}%'`)
                    .orWhere(`${alias}.tin LIKE '%${+params.search}%'`);
            }
            else {
                customFindWithRelations
                    .andWhere(`owner_account.first_name LIKE '%${params.search}%'`)
                    .orWhere(`owner_account.last_name LIKE '%${params.search}%'`)
                    .orWhere(`${alias}.name LIKE '%${params.search}%'`)
                    .orWhere(`owner_account.phone_number LIKE '%${+params.search}%'`);
            }
        }
        return await super.find(params, pagination, () => customFindWithRelations, 't');
    }
    async deleteById(id) {
        const q = this.findWithRelations('t');
        q.andWhere('t.is_archived != true');
        const partner = await q.getOne();
        if (!partner) {
            throw new common_1.BadRequestException('A partner cannot be deleted/archived');
        }
        let updateSet;
        if (partner.drivers && partner.drivers.length) {
            updateSet = {
                is_archived: true,
                archived_at: (new Date()).toISOString(),
            };
        }
        else {
            updateSet = {
                is_deleted: true,
                deleted_at: (new Date()).toISOString(),
            };
        }
        await this.repository
            .createQueryBuilder()
            .update(updateSet)
            .where('id = :id', { id })
            .execute();
    }
    async setArchivedStatusById(id, body) {
        await this.utilsService.setArchivedStatusById(id, body, (alias) => this.findWithRelations(alias), this.repository);
    }
    findWithRelations(alias) {
        return this.repository.createQueryBuilder(alias)
            .leftJoinAndMapOne(`${alias}.owner_account`, account_entity_1.Account, 'owner_account', `owner_account.id = ${alias}.owner_account_id`)
            .leftJoinAndMapOne(`${alias}.bank_account`, bank_account_entity_1.BankAccount, 'bank_account', `bank_account.id = ${alias}.bank_account_id`)
            .leftJoinAndMapOne(`${alias}.location`, location_entity_1.LocationEntity, 'location', `location.id = ${alias}.location_id`)
            .leftJoinAndMapMany(`${alias}.drivers`, driver_entity_1.Driver, 'driver', `driver.partner_id = ${alias}.id`)
            .leftJoinAndMapMany(`${alias}.files`, partner_file_entity_1.PartnerFile, 'file', `${alias}.id = file.partner_id AND file.is_deleted != true`)
            .where(`${alias}.is_deleted != true`)
            .andWhere(`owner_account.is_deleted != true`);
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_partner_dto_1.CreatePartnerDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], PartnerService.prototype, "create", null);
__decorate([
    typeorm_1.Transaction(),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_partner_dto_1.UpdatePartnerDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], PartnerService.prototype, "updateById", null);
PartnerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(partner_entity_1.Partner)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        location_service_1.LocationService,
        bank_account_service_1.BankAccountService,
        account_service_1.AccountService,
        file_service_1.FileService,
        fileUtils_1.FileUtils,
        utils_service_1.UtilsService])
], PartnerService);
exports.PartnerService = PartnerService;
//# sourceMappingURL=partner.service.js.map