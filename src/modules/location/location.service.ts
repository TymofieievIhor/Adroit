import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager, getManager, Repository, Transaction, TransactionManager } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {LocationEntity} from './location.entity';
import {ServiceBase} from '../../common/helpers/service.base';
import {UpdateLocationDto} from './dto/update-location.dto';
import {BASE_ENTITY_PROPS} from '../../common/helpers/constant';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationLink } from './location-link.entity';
import { LocationOwnerLink } from '../../common/helpers/interfaces/location.interface';

@Injectable()
export class LocationService extends ServiceBase<LocationEntity> {
    constructor(
      @InjectRepository(LocationEntity) protected readonly repository: Repository<LocationEntity>,
    ) {
        super(LocationEntity, repository);
    }

    async create(
      data: CreateLocationDto | UpdateLocationDto,
      manager?: EntityManager | Repository<LocationEntity>,
      creatorName?: string,
    ): Promise<LocationEntity> {
      manager = manager || this.repository;
      const location = Object.assign(new LocationEntity(), data);
      if (creatorName === 'partner' || creatorName === 'client') {
        location.type = 'business';
      }
      return await manager.save(location);
    }

    async createLink(
      nameIdObj: LocationOwnerLink,
      locationId: number,
      manager?: EntityManager,
    ): Promise<LocationLink> {
        const link = new LocationLink();
        link[`${nameIdObj.name}_id`] = nameIdObj.id;
        return await manager.save(Object.assign(link, {location_id: locationId}));
    }

    @Transaction()
    async updateById(id: number,
                     data: UpdateLocationDto,
                     locationOwnerNameIdObj ?: any,
                     @TransactionManager() manager?: EntityManager): Promise<LocationEntity> {
        return await this.updateByIdInTxChain(id, data, locationOwnerNameIdObj, manager);
    }

    async updateByIdInTxChain(
      id: number,
      data: UpdateLocationDto,
      locationOwnerNameIdObj: LocationOwnerLink,
      manager?: EntityManager,
    ): Promise<LocationEntity> {
      const location = await super.checkIfIsDeleted({id});
      const updatedLocation = Object.assign({}, location, data);

      this.deleteProps(updatedLocation, BASE_ENTITY_PROPS);
      const isPassenger = locationOwnerNameIdObj.name === 'passenger';
      const locationLink = await manager.findOne(LocationLink, {location_id: location.id});

      const newLoc = await manager.save(Object.assign(new LocationEntity(), updatedLocation));
      if (locationLink) {
        if (isPassenger) {
          locationLink.location_id = newLoc.id;
          await manager.save(locationLink);
        } else {
          const newLocLink = Object.assign(new LocationLink(), locationLink);
          newLocLink.location_id = newLoc.id;
          super.deleteProps(newLocLink, BASE_ENTITY_PROPS);
          await manager.save(Object.assign(new LocationLink(), newLocLink));

          locationLink.is_deleted = true;
          locationLink.deleted_at = (new Date()).toISOString();
          await manager.save(locationLink);
        }
      } else {
        await this.createLink(locationOwnerNameIdObj, newLoc.id, manager);
      }

      return newLoc;
    }

    async updateByIdNoLink(id: number, data: UpdateLocationDto, manager?: EntityManager): Promise<LocationEntity> {
      const location = await super.checkIfIsDeleted({id});
      const updatedLocation = Object.assign({}, location, data);

      this.deleteProps(updatedLocation, BASE_ENTITY_PROPS);

      return await manager.save(LocationEntity, Object.assign(new LocationEntity(), updatedLocation));
    }

    async findLocationByLocationLinkId(locationLinkId: number): Promise<LocationEntity> {
      const manager = getManager();
      const locationLink = await manager.findOne(LocationLink, {id: locationLinkId});
      if (locationLink) {
        return await manager.findOne(LocationEntity, {id: locationLink.location_id});
      }
    }

    async findLocationLinkInTxChain(locationId: number, locationOwnerLink: LocationOwnerLink, manager: EntityManager): Promise<LocationLink> {
      const params = {} as LocationLink;
      params[`${locationOwnerLink.name}_id`] = locationOwnerLink.id;
      params.location_id = locationId;
      return await manager.findOne(LocationLink, params);
    }

    async deleteLinkByLocIdInTxChain(locId: number, manager: EntityManager): Promise<void> {
      const link = await manager.findOne(LocationLink, {location_id: locId});
      if (!link) {
        throw new BadRequestException('The link does not exist');
      }
      link.is_deleted = true;
      link.deleted_at = (new Date()).toISOString();
      await manager.save(link);
    }
}