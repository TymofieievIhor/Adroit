import { LocationEntity } from '../location/location.entity';
import { EntityBase } from '../../common/helpers/entity.base';
export declare class DriverLicense extends EntityBase {
    number: string;
    date_of_expiration: string;
    issued_by_state: string;
    weight_in_pounds: number;
    height_in_feet: number;
    height_in_inches: number;
    hair_color: string;
    eye_color: string;
    location_id: number;
    location: LocationEntity;
}
