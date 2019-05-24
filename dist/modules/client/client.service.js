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
const client_entity_1 = require("./client.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const create_client_dto_1 = require("./dto/create-client.dto");
const location_service_1 = require("../location/location.service");
const bank_account_service_1 = require("../bank-account/bank-account.service");
const account_service_1 = require("../account/account.service");
const client_type_service_1 = require("../client-type/client-type.service");
const account_entity_1 = require("../account/account.entity");
const bank_account_entity_1 = require("../bank-account/bank-account.entity");
const location_entity_1 = require("../location/location.entity");
const contact_service_1 = require("../contact/contact.service");
const contact_entity_1 = require("../contact/contact.entity");
const file_service_1 = require("../file/file.service");
const client_file_entity_1 = require("../file/entities/client-file.entity");
const update_client_dto_1 = require("./dto/update-client.dto");
const fileUtils_1 = require("../file/fileUtils");
const utils_service_1 = require("../../common/utils/utils.service");
const client_admin_service_1 = require("../client-admin/client-admin.service");
const passenger_entity_1 = require("../passenger/passenger.entity");
const client_admin_entity_1 = require("../client-admin/client-admin.entity");
const client_type_entity_1 = require("../client-type/client-type.entity");
const service_contract_service_1 = require("../service-contract/service-contract.service");
const service_contract_entity_1 = require("../service-contract/entities/service-contract.entity");
const service_contract_pricing_entity_1 = require("../service-contract/entities/service-contract-pricing.entity");
const ride_route_entity_1 = require("../ride-management/entities/ride-route.entity");
const ride_client_entity_1 = require("../ride-management/entities/ride-client.entity");
let ClientService = class ClientService extends service_base_1.ServiceBase {
    constructor(repository, locationService, bankAccountService, accountService, clientTypeService, contactService, fileService, fileUtils, utilsService, clientAdminService, serviceContractService) {
        super(client_entity_1.Client, repository);
        this.repository = repository;
        this.locationService = locationService;
        this.bankAccountService = bankAccountService;
        this.accountService = accountService;
        this.clientTypeService = clientTypeService;
        this.contactService = contactService;
        this.fileService = fileService;
        this.fileUtils = fileUtils;
        this.utilsService = utilsService;
        this.clientAdminService = clientAdminService;
        this.serviceContractService = serviceContractService;
    }
    async create(data, manager) {
        const client = Object.assign(new client_entity_1.Client(), data.client);
        const location = await this.locationService.create(Object.assign({}, data.location), manager, 'client');
        const account = await this.accountService.create(Object.assign({}, data.owner_account, { account_type_id: 9 }), manager);
        let bankAccount = await this.bankAccountService.create(Object.assign({}, data.bank_account), manager);
        client.location_id = location.id;
        client.owner_account_id = account.id;
        client.bank_account_id = bankAccount.id;
        const clientSaved = await manager.save(client);
        const contractPromises = [];
        for (const c of data.contracts) {
            contractPromises.push(this.serviceContractService.createInTxChain(Object.assign(c, { client_id: clientSaved.id }), manager));
        }
        await Promise.all(contractPromises);
        if (data.admins && data.admins.length) {
            const adminPromises = [];
            for (const a of data.admins) {
                adminPromises.push(this.clientAdminService.createInTxChain(Object.assign({}, a, { client_id: clientSaved.id }), manager));
            }
            await Promise.all(adminPromises);
        }
        await this.locationService.createLink({ name: 'client', id: clientSaved.id }, clientSaved.location_id, manager);
        if (data.contacts && data.contacts.length) {
            const contactPromises = [];
            for (const c of data.contacts) {
                contactPromises.push(this.contactService.create(Object.assign({}, c, { client_id: clientSaved.id }), manager));
            }
            await Promise.all(contactPromises);
        }
        if (data.files && data.files.length) {
            await this.fileUtils.modifyFileLink(data.files, { name: 'client', id: clientSaved.id }, data.account_id, manager);
        }
        bankAccount = await manager.save(bank_account_entity_1.BankAccount, Object.assign(bankAccount, { client_id: clientSaved.id }));
        clientSaved.bank_account = bankAccount;
        clientSaved.owner_account = account;
        clientSaved.location = location;
        clientSaved.client_type = await this.clientTypeService.findOne({ id: clientSaved.client_type_id });
        clientSaved.contacts = await this.contactService.findAllByParams({ client_id: clientSaved.id });
        clientSaved.files = (await this.fileService.findFilesByOwner(clientSaved.id, 'client')).items;
        return clientSaved;
    }
    async find(body, pagination) {
        const alias = 't';
        const q = this.findWithRelations(alias);
        const patternMatchingFields = ['name', 'phone_number'];
        for (const key of Object.keys(body)) {
            if (patternMatchingFields.includes(key)) {
                q.andWhere(`${alias}.${key} LIKE '%${body[key]}%'`);
            }
            else if (key === 'owner_account') {
                q.andWhere(`owner_account.first_name LIKE  '%${body[key]}%' OR owner_account.last_name LIKE '%${body[key]}%'`);
            }
        }
        const result = await super.find(body, pagination, () => q);
        this.addContractsAndPricing(result.items);
        return result;
    }
    async findById(id) {
        const q = this.findWithRelations('t')
            .andWhere('t.id = :id', { id });
        const client = await q.getOne();
        this.addContractsAndPricing([client]);
        return client;
    }
    async findContacts(id, pagination) {
        return this.contactService.find({ client_id: id }, pagination);
    }
    async updateById(id, data, manager) {
        let client = await manager.findOne(client_entity_1.Client, { id, is_deleted: false, is_archived: false });
        if (!client) {
            throw new common_1.BadRequestException('The client does not exist');
        }
        if (data.client && Object.keys(data.client).length) {
            for (const [field, value] of Object.entries(data.client)) {
                client[field] = value;
            }
        }
        let newLoc;
        let newBankAcc;
        if (data.location && Object.keys(data.location).length) {
            const location = await this.locationService.findById(client.location_id);
            newLoc = await this.locationService.updateByIdInTxChain(location.id, data.location, { name: 'client', id: client.id }, manager);
            client.location_id = newLoc.id;
        }
        if (data.bank_account && Object.keys(data.bank_account).length) {
            const bankAccount = await this.bankAccountService.findById(client.bank_account_id);
            newBankAcc = await this.bankAccountService.updateByIdInTxChain(bankAccount.id, data.bank_account, manager);
            client.bank_account_id = newBankAcc.id;
        }
        if (data.contacts && data.contacts.length) {
            const updatePromises = [];
            const deletePromises = [];
            for (const c of data.contacts) {
                if (c.hasOwnProperty('id') && Object.keys(c).length === 1) {
                    deletePromises.push(this.contactService.deleteById(c.id, data.account_id));
                }
                else {
                    updatePromises.push(this.contactService.updateByIdInTxChain(c.id, c, manager, { name: 'client', id: client.id }));
                }
            }
            await Promise.all([...updatePromises, ...deletePromises]);
        }
        if (data.admins && data.admins.length) {
            await this.utilsService.modifyArrayEntities(data.admins, this.clientAdminService, manager, { name: 'client', id: client.id }, data.account_id);
        }
        if (data.files) {
            await this.fileUtils.modifyFileLink(data.files, { name: 'client', id: client.id }, data.account_id, manager);
        }
        if (data.contracts && data.contracts.length) {
            const updatePromises = [];
            const amendPromises = [];
            for (const c of data.contracts) {
                if (c.contract && c.contract.hasOwnProperty('id') && Object.keys(c.contract).length === 1) {
                    amendPromises.push(this.serviceContractService.setStatusByIdInTxChain(c.contract.id, 'amended', manager));
                }
                else {
                    updatePromises.push(this.serviceContractService.updateInTxChain(c.contract.id, Object.assign(c, { client_id: id }), manager));
                }
            }
            await Promise.all([...updatePromises, ...amendPromises]);
        }
        client = await manager.save(client);
        client.id = id;
        if (newLoc) {
            client.location = newLoc;
        }
        if (newBankAcc) {
            client.bank_account = newBankAcc;
        }
        client.contacts = await manager.find(contact_entity_1.Contact, { is_deleted: false, client_id: client.id });
        client.files = (await this.fileService.findFilesByOwner(client.id, 'client')).items;
        return client;
    }
    async setArchivedStatusById(id, body) {
        await this.utilsService.setArchivedStatusById(id, body, (alias) => this.findWithRelations(alias), this.repository);
    }
    async getServiceContractsById(id, pagination) {
        return await this.serviceContractService.find({ client_id: id }, pagination);
    }
    async deleteById(id) {
        const q = this.findWithRelations('t');
        q.andWhere('t.is_archived != true');
        const client = await q.getOne();
        if (!client) {
            throw new common_1.BadRequestException('A client cannot be deleted/archived');
        }
        let updateSet;
        if (client.contacts && client.contacts.length) {
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
    addContractsAndPricing(items) {
        if (items && items.length) {
            for (const item of items) {
                if (item && Object.keys(item).length) {
                    item.contractsWithPricing = [];
                    for (const contract of item.contracts) {
                        const pricing = Object.assign({}, contract.pricing);
                        delete contract.pricing;
                        const contractWithPricing = {
                            pricing,
                            contract,
                        };
                        item.contractsWithPricing.push(contractWithPricing);
                    }
                    delete item.contracts;
                }
            }
        }
    }
    findWithRelations(alias) {
        return this.repository.createQueryBuilder(alias)
            .leftJoinAndMapOne(`${alias}.owner_account`, account_entity_1.Account, 'owner_account', `owner_account.id = ${alias}.owner_account_id`)
            .leftJoinAndMapOne(`${alias}.bank_account`, bank_account_entity_1.BankAccount, 'bank_account', `bank_account.id = ${alias}.bank_account_id`)
            .leftJoinAndMapOne(`${alias}.location`, location_entity_1.LocationEntity, 'location', `location.id = ${alias}.location_id`)
            .leftJoinAndMapOne(`${alias}.client_type`, client_type_entity_1.ClientType, 'client_type', `client_type.id = ${alias}.client_type_id`)
            .leftJoinAndMapMany(`${alias}.contacts`, contact_entity_1.Contact, 'contact', `contact.client_id = ${alias}.id AND contact.is_deleted != true`)
            .leftJoinAndMapMany(`${alias}.files`, client_file_entity_1.ClientFile, 'file', `${alias}.id = file.client_id AND file.is_deleted != true`)
            .leftJoinAndMapMany(`${alias}.passengers`, passenger_entity_1.Passenger, 'passenger', `${alias}.id = passenger.client_id AND passenger.is_deleted != true`)
            .leftJoinAndMapMany(`${alias}.admins`, client_admin_entity_1.ClientAdmin, 'admin', `${alias}.id = admin.client_id AND admin.is_deleted != true`)
            .leftJoinAndMapOne('admin.account', account_entity_1.Account, 'adm_acc', `adm_acc.id = admin.account_id`)
            .leftJoinAndMapMany(`${alias}.contracts`, service_contract_entity_1.ServiceContract, 'contract', `${alias}.id = contract.client_id AND contract.is_deleted != true AND contract.service_contract_status_id != 4`)
            .leftJoinAndMapOne(`contract.pricing`, service_contract_pricing_entity_1.ServiceContractPricing, 'pr', `contract.id = pr.service_contract_id`)
            .leftJoin(ride_client_entity_1.RideClient, 'rideClient', `${alias}.id = rideClient.client_id`)
            .leftJoinAndMapMany(`${alias}.ride_routes`, ride_route_entity_1.RideRoute, 'rideRoute', 'rideClient.ride_route_id = rideRoute.id')
            .where(`${alias}.is_deleted != true`)
            .andWhere(`owner_account.is_deleted != true`);
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_dto_1.CreateClientDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], ClientService.prototype, "create", null);
__decorate([
    typeorm_1.Transaction(),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_client_dto_1.UpdateClientDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], ClientService.prototype, "updateById", null);
ClientService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        location_service_1.LocationService,
        bank_account_service_1.BankAccountService,
        account_service_1.AccountService,
        client_type_service_1.ClientTypeService,
        contact_service_1.ContactService,
        file_service_1.FileService,
        fileUtils_1.FileUtils,
        utils_service_1.UtilsService,
        client_admin_service_1.ClientAdminService,
        service_contract_service_1.ServiceContractService])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map