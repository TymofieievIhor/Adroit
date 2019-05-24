import { EntityBase } from '../../../common/helpers/entity.base';
import { Passenger } from '../../passenger/passenger.entity';
export declare class RidePlacePassenger extends EntityBase {
    ride_route_id: number;
    passenger_id: number;
    place_id: number;
    deleted_by_account_id: number;
    passenger: Passenger;
}
