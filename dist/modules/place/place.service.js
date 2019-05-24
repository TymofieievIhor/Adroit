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
const service_base_1 = require("../../common/helpers/service.base");
const place_entity_1 = require("./entities/place.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const create_place_dto_1 = require("./dto/create-place.dto");
const location_service_1 = require("../location/location.service");
const update_place_dto_1 = require("./dto/update-place.dto");
const location_entity_1 = require("../location/location.entity");
const utils_service_1 = require("../../common/utils/utils.service");
const time_zone_service_1 = require("../time-zone/time-zone.service");
const time_zone_entity_1 = require("../time-zone/time-zone.entity");
let PlaceService = class PlaceService extends service_base_1.ServiceBase {
    constructor(repository, locationService, utilsService, timeZoneService) {
        super(place_entity_1.Place, repository);
        this.repository = repository;
        this.locationService = locationService;
        this.utilsService = utilsService;
        this.timeZoneService = timeZoneService;
    }
    async create(data, manager) {
        const place = Object.assign(new place_entity_1.Place(), data.place);
        const location = await this.locationService.create(data.location, manager);
        place.location_id = location.id;
        const placeSaved = await manager.save(place);
        await this.locationService.createLink({ name: 'place', id: placeSaved.id }, location.id, manager);
        placeSaved.location = location;
        placeSaved.time_zone = await this.timeZoneService.findOne({ id: placeSaved.time_zone_id });
        return placeSaved;
    }
    async find(body, pagination) {
        const q = this.findWithRelations('t');
        const placeProps = ['name', 'phone_number'];
        for (const prop of Object.keys(body)) {
            if (prop === 'location') {
                q.andWhere(`location.street1 LIKE '%${body[prop]}%'`);
            }
            else if (prop === 'type') {
                q.andWhere(`location.type LIKE '%${body[prop]}%'`);
            }
            else if (prop === 'time_zone') {
                q.andWhere(`time_zone.abbreviation LIKE '%${body[prop]}%'`);
            }
            else if (placeProps.includes(prop)) {
                q.andWhere(`t.${prop} LIKE '%${body[prop]}%'`);
            }
        }
        return await super.find({}, pagination, () => q);
    }
    async findById(id) {
        const q = this.findWithRelations('t')
            .andWhere('t.id = :id', { id });
        return await q.getOne();
    }
    async updateById(id, data, manager) {
        const place = await manager.findOne(place_entity_1.Place, { id, is_deleted: false, is_archived: false });
        if (!place) {
            throw new common_1.BadRequestException('The place cannot be updated');
        }
        if (data.place && Object.keys(data.place).length) {
            for (const field of Object.keys(data.place)) {
                place[field] = data.place[field];
            }
        }
        let newLoc;
        if (data.location && Object.keys(data.location).length) {
            const existingLoc = await this.locationService.findById(place.location_id);
            newLoc = await this.locationService.updateByIdInTxChain(existingLoc.id, data.location, { name: 'place', id: place.id }, manager);
            place.location_id = newLoc.id;
        }
        return await manager.save(place);
    }
    async setArchivedStatusById(id, body) {
        await this.utilsService.setArchivedStatusById(id, body, (alias) => this.findWithRelations(alias), this.repository);
    }
    findWithRelations(alias) {
        return this.repository.createQueryBuilder(alias)
            .leftJoinAndMapOne(`${alias}.location`, location_entity_1.LocationEntity, 'location', `${alias}.location_id = location.id`)
            .leftJoinAndMapOne(`${alias}.time_zone`, time_zone_entity_1.TimeZone, 'time_zone', `${alias}.time_zone_id = time_zone.id`)
            .where(`${alias}.is_deleted != true`);
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(1, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_place_dto_1.CreatePlaceDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], PlaceService.prototype, "create", null);
__decorate([
    typeorm_1.Transaction(),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_place_dto_1.UpdatePlaceDto, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], PlaceService.prototype, "updateById", null);
PlaceService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(place_entity_1.Place)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        location_service_1.LocationService,
        utils_service_1.UtilsService,
        time_zone_service_1.TimeZoneService])
], PlaceService);
exports.PlaceService = PlaceService;
//# sourceMappingURL=place.service.js.map