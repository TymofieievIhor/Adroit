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
const passenger_entity_1 = require("./passenger.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const create_passenger_dto_1 = require("./dto/create-passenger.dto");
const location_service_1 = require("../location/location.service");
const contact_service_1 = require("../contact/contact.service");
const update_passenger_dto_1 = require("./dto/update-passenger.dto");
const guardian_service_1 = require("../guardian/guardian.service");
const location_entity_1 = require("../location/location.entity");
const guardian_entity_1 = require("../guardian/guardian.entity");
const account_entity_1 = require("../account/account.entity");
const contact_entity_1 = require("../contact/contact.entity");
const client_entity_1 = require("../client/client.entity");
const utils_service_1 = require("../../common/utils/utils.service");
const location_link_entity_1 = require("../location/location-link.entity");
let PassengerService = class PassengerService extends service_base_1.ServiceBase {
    constructor(repository, locationService, contactService, guardianService, utilsService) {
        super(passenger_entity_1.Passenger, repository);
        this.repository = repository;
        this.locationService = locationService;
        this.contactService = contactService;
        this.guardianService = guardianService;
        this.utilsService = utilsService;
    }
    async create(data, manager) {
        data.passenger.date_of_birth = super.convertDateTimeToDateStringFormat(data.passenger.date_of_birth);
        const passenger = Object.assign(new passenger_entity_1.Passenger(), data.passenger);
        const locationIds = [];
        for (const loc of data.locations) {
            const location = await this.locationService.create(loc, manager);
            locationIds.push(location.id);
        }
        const passengerSaved = await manager.save(passenger);
        if (data.contacts) {
            const contactPromises = [];
            for (const c of data.contacts) {
                contactPromises.push(this.contactService.create(Object.assign({}, c, {}, { passenger_id: passengerSaved.id }), manager));
            }
            await Promise.all(contactPromises);
        }
        const passengerAddrPromises = [];
        for (const id of locationIds) {
            passengerAddrPromises.push(this.locationService.createLink({ name: 'passenger', id: passengerSaved.id }, id, manager));
        }
        await Promise.all(passengerAddrPromises);
        if (data.guardians && data.guardians.length) {
            const guardians = [];
            for (const g of data.guardians) {
                guardians.push(this.guardianService.createInTxChain(Object.assign(g, { passenger_id: passengerSaved.id }), manager));
            }
            await Promise.all(guardians);
        }
        return passengerSaved;
    }
    async updateById(id, data, manager) {
        const passenger = await manager.findOne(passenger_entity_1.Passenger, { id, is_deleted: false, is_archived: false });
        if (!passenger) {
            throw new common_1.BadRequestException('The passenger does not exist');
        }
        if (data.locations && data.locations.length) {
            for (const loc of data.locations) {
                if (loc.hasOwnProperty('id') && Object.keys(loc).length === 1) {
                    await this.locationService.deleteLinkByLocIdInTxChain(loc.id, manager);
                }
                else {
                    const location = await this.locationService.findById(loc.id);
                    let newLoc;
                    if (!location) {
                        newLoc = await this.locationService.create(loc, manager);
                        await this.locationService.createLink({ name: 'passenger', id }, newLoc.id, manager);
                    }
                    else {
                        newLoc = await this.locationService.updateByIdInTxChain(location.id, loc, { name: 'passenger', id: passenger.id }, manager);
                    }
                }
            }
        }
        let passengerSaved;
        if (data.passenger && Object.keys(data.passenger).length) {
            passengerSaved = await manager.save(Object.assign(passenger, data.passenger));
        }
        if (data.contacts && data.contacts.length) {
            await this.modifyContactsGuardians(data.contacts, this.contactService, manager, { name: 'passenger', id: passenger.id }, data.account_id);
        }
        if (data.guardians && data.guardians.length) {
            await this.modifyContactsGuardians(data.guardians, this.guardianService, manager, { name: 'passenger', id: passenger.id }, data.account_id);
        }
        return passengerSaved || passenger;
    }
    async findById(id) {
        return await super.findById(id, () => this.findWithRelations('t'));
    }
    async find(body, pagination) {
        const alias = 't';
        const customFindWithRelations = this.findWithRelations(alias);
        const passengerParams = ['first_name', 'last_name', 'type'];
        for (const param of Object.keys(body)) {
            if (passengerParams.includes(param)) {
                customFindWithRelations
                    .andWhere(`${alias}.${param} LIKE '%${body[param]}%'`);
            }
            else if (param === 'client_id') {
                customFindWithRelations
                    .andWhere(`cl.id = :id`, { id: body.client_id });
            }
            else if (param === 'paying_client') {
                customFindWithRelations
                    .andWhere(`cl.name LIKE '%${body.paying_client}%'`);
            }
        }
        return await super.find(body, pagination, () => customFindWithRelations);
    }
    async modifyContactsGuardians(data, service, manager, ownerData, accountId) {
        const updatePromises = [];
        const deletePromises = [];
        for (const c of data) {
            if (c.hasOwnProperty('id') && Object.keys(c).length === 1) {
                deletePromises.push(service.deleteByIdInTxChain(c.id, manager, accountId));
            }
            else {
                updatePromises.push(service.updateByIdInTxChain(c.id, c, manager, ownerData));
            }
        }
        await Promise.all([...updatePromises, ...deletePromises]);
    }
    async setArchivedStatusById(id, body) {
        await this.utilsService.setArchivedStatusById(id, body, (alias) => this.findWithRelations(alias), this.repository);
    }
    async findPassengersByClientId(clientId) {
        return await this.repository.find({ client_id: clientId, is_deleted: false, is_archived: false });
    }
    findWithRelations(alias) {
        return this.repository.createQueryBuilder(alias)
            .leftJoinAndMapMany(`${alias}.passengerAddressLink`, location_link_entity_1.LocationLink, 'address', `address.passenger_id = ${alias}.id AND address.is_deleted != true`)
            .leftJoinAndMapOne(`address.location`, location_entity_1.LocationEntity, 'l', `l.id = address.location_id`)
            .leftJoinAndMapMany(`${alias}.guardians`, guardian_entity_1.Guardian, 'g', `g.passenger_id = ${alias}.id AND g.is_deleted != true`)
            .leftJoinAndMapOne('g.account', account_entity_1.Account, 'a', 'a.id = g.account_id AND (a.is_deleted != true AND a.is_blocked != true)')
            .leftJoinAndMapMany(`${alias}.contacts`, contact_entity_1.Contact, 'c', `c.passenger_id = ${alias}.id AND c.is_deleted != true`)
            .leftJoinAndMapOne(`${alias}.client`, client_entity_1.Client, 'cl', `cl.id = ${alias}.client_id AND cl.is_deleted != true`)
            .where(`${alias}.is_deleted != true`);
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_passenger_dto_1.CreatePassengerDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], PassengerService.prototype, "create", null);
__decorate([
    typeorm_1.Transaction(),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_passenger_dto_1.UpdatePassengerDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], PassengerService.prototype, "updateById", null);
PassengerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(passenger_entity_1.Passenger)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        location_service_1.LocationService,
        contact_service_1.ContactService,
        guardian_service_1.GuardianService,
        utils_service_1.UtilsService])
], PassengerService);
exports.PassengerService = PassengerService;
//# sourceMappingURL=passenger.service.js.map