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
const typeorm_2 = require("@nestjs/typeorm");
const location_entity_1 = require("./location.entity");
const service_base_1 = require("../../common/helpers/service.base");
const update_location_dto_1 = require("./dto/update-location.dto");
const constant_1 = require("../../common/helpers/constant");
const location_link_entity_1 = require("./location-link.entity");
let LocationService = class LocationService extends service_base_1.ServiceBase {
    constructor(repository) {
        super(location_entity_1.LocationEntity, repository);
        this.repository = repository;
    }
    async create(data, manager, creatorName) {
        manager = manager || this.repository;
        const location = Object.assign(new location_entity_1.LocationEntity(), data);
        if (creatorName === 'partner' || creatorName === 'client') {
            location.type = 'business';
        }
        return await manager.save(location);
    }
    async createLink(nameIdObj, locationId, manager) {
        const link = new location_link_entity_1.LocationLink();
        link[`${nameIdObj.name}_id`] = nameIdObj.id;
        return await manager.save(Object.assign(link, { location_id: locationId }));
    }
    async updateById(id, data, locationOwnerNameIdObj, manager) {
        return await this.updateByIdInTxChain(id, data, locationOwnerNameIdObj, manager);
    }
    async updateByIdInTxChain(id, data, locationOwnerNameIdObj, manager) {
        const location = await super.checkIfIsDeleted({ id });
        const updatedLocation = Object.assign({}, location, data);
        this.deleteProps(updatedLocation, constant_1.BASE_ENTITY_PROPS);
        const isPassenger = locationOwnerNameIdObj.name === 'passenger';
        const locationLink = await manager.findOne(location_link_entity_1.LocationLink, { location_id: location.id });
        const newLoc = await manager.save(Object.assign(new location_entity_1.LocationEntity(), updatedLocation));
        if (locationLink) {
            if (isPassenger) {
                locationLink.location_id = newLoc.id;
                await manager.save(locationLink);
            }
            else {
                const newLocLink = Object.assign(new location_link_entity_1.LocationLink(), locationLink);
                newLocLink.location_id = newLoc.id;
                super.deleteProps(newLocLink, constant_1.BASE_ENTITY_PROPS);
                await manager.save(Object.assign(new location_link_entity_1.LocationLink(), newLocLink));
                locationLink.is_deleted = true;
                locationLink.deleted_at = (new Date()).toISOString();
                await manager.save(locationLink);
            }
        }
        else {
            await this.createLink(locationOwnerNameIdObj, newLoc.id, manager);
        }
        return newLoc;
    }
    async updateByIdNoLink(id, data, manager) {
        const location = await super.checkIfIsDeleted({ id });
        const updatedLocation = Object.assign({}, location, data);
        this.deleteProps(updatedLocation, constant_1.BASE_ENTITY_PROPS);
        return await manager.save(location_entity_1.LocationEntity, Object.assign(new location_entity_1.LocationEntity(), updatedLocation));
    }
    async findLocationByLocationLinkId(locationLinkId) {
        const manager = typeorm_1.getManager();
        const locationLink = await manager.findOne(location_link_entity_1.LocationLink, { id: locationLinkId });
        if (locationLink) {
            return await manager.findOne(location_entity_1.LocationEntity, { id: locationLink.location_id });
        }
    }
    async findLocationLinkInTxChain(locationId, locationOwnerLink, manager) {
        const params = {};
        params[`${locationOwnerLink.name}_id`] = locationOwnerLink.id;
        params.location_id = locationId;
        return await manager.findOne(location_link_entity_1.LocationLink, params);
    }
    async deleteLinkByLocIdInTxChain(locId, manager) {
        const link = await manager.findOne(location_link_entity_1.LocationLink, { location_id: locId });
        if (!link) {
            throw new common_1.BadRequestException('The link does not exist');
        }
        link.is_deleted = true;
        link.deleted_at = (new Date()).toISOString();
        await manager.save(link);
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(3, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_location_dto_1.UpdateLocationDto, Object, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], LocationService.prototype, "updateById", null);
LocationService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(location_entity_1.LocationEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map