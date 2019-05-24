import { EntityBase } from '../../../common/helpers/entity.base';
export declare class TripVehicle extends EntityBase {
    vehicle_id: number;
    trip_id: number;
    license_plate: string;
    make: string;
    model: string;
    type: string;
    color: string;
    picture_url: string;
    is_switched: boolean;
    switched_at: string;
    switched_by_account_id: number;
}
