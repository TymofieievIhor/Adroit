import { EntityBase } from '../../common/helpers/entity.base';
import { LocationEntity } from './location.entity';
export declare class PassengerAddress extends EntityBase {
    location_id: number;
    passenger_id: number;
    location: LocationEntity;
}
