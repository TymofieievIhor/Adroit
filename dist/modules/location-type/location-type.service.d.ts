import { Repository } from 'typeorm';
import { LocationType } from './location-type.entity';
import { ServiceBase } from '../../common/helpers/service.base';
export declare class LocationTypeService extends ServiceBase<LocationType> {
    protected readonly repository: Repository<LocationType>;
    constructor(repository: Repository<LocationType>);
}
