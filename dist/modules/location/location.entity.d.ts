import { EntityBase } from '../../common/helpers/entity.base';
export declare class LocationEntity extends EntityBase {
    type: string;
    latitude: number;
    longitude: number;
    street1: string;
    street2: string;
    city: string;
    state: string;
    zipcode: number;
    country: string;
}
