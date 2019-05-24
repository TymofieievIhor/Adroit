import { EntityBase } from '../../../common/helpers/entity.base';
export declare class TripPassenger extends EntityBase {
    passenger_id: number;
    trip_id: number;
    type_text_value: string;
    type_name: string;
    first_name: string;
    last_name: string;
    picture_url: string;
    needs_booster_seat: boolean;
    needs_car_seat: boolean;
    needs_safety_vest: boolean;
    needs_monitor: boolean;
}
