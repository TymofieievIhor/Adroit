import { EntityManager, Repository } from 'typeorm';
import { LocationEntity } from './location.entity';
import { ServiceBase } from '../../common/helpers/service.base';
import { UpdateLocationDto } from './dto/update-location.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationLink } from './location-link.entity';
import { LocationOwnerLink } from '../../common/helpers/interfaces/location.interface';
export declare class LocationService extends ServiceBase<LocationEntity> {
    protected readonly repository: Repository<LocationEntity>;
    constructor(repository: Repository<LocationEntity>);
    create(data: CreateLocationDto | UpdateLocationDto, manager?: EntityManager | Repository<LocationEntity>, creatorName?: string): Promise<LocationEntity>;
    createLink(nameIdObj: LocationOwnerLink, locationId: number, manager?: EntityManager): Promise<LocationLink>;
    updateById(id: number, data: UpdateLocationDto, locationOwnerNameIdObj?: any, manager?: EntityManager): Promise<LocationEntity>;
    updateByIdInTxChain(id: number, data: UpdateLocationDto, locationOwnerNameIdObj: LocationOwnerLink, manager?: EntityManager): Promise<LocationEntity>;
    updateByIdNoLink(id: number, data: UpdateLocationDto, manager?: EntityManager): Promise<LocationEntity>;
    findLocationByLocationLinkId(locationLinkId: number): Promise<LocationEntity>;
    findLocationLinkInTxChain(locationId: number, locationOwnerLink: LocationOwnerLink, manager: EntityManager): Promise<LocationLink>;
    deleteLinkByLocIdInTxChain(locId: number, manager: EntityManager): Promise<void>;
}
