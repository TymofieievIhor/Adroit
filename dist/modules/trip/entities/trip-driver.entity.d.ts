import { EntityBase } from '../../../common/helpers/entity.base';
export declare class TripDriver extends EntityBase {
    driver_account_id: number;
    driver_id: number;
    trip_id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    picture_url: string;
    driver_email: string;
    partner_name: string;
    partner_id: number;
    is_switched: boolean;
    switched_at: string;
    switched_by_account_id: number;
}
