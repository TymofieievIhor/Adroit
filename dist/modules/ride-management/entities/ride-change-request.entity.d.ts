import { EntityBase } from '../../../common/helpers/entity.base';
export declare class RideChangeRequest extends EntityBase {
    effective_date: string;
    ride_change_request_type_id: number;
    ride_route_id: number;
    place_id: number;
    passenger_id: number;
    apply_to_am_blueprint: boolean;
    apply_to_am_late_start_blueprint: boolean;
    apply_to_pm_blueprint: boolean;
    apply_to_pm_early_end_blueprint: boolean;
    note: string;
    deleted_by_account_id: number;
}
