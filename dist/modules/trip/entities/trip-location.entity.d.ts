import { EntityBase } from '../../../common/helpers/entity.base';
export declare class TripLocation extends EntityBase {
    type_text_value: string;
    type_name: string;
    latitude: number;
    longitude: number;
    street1: string;
    street2: string;
    city: string;
    state: string;
    zipcode: number;
    country: string;
}
