import { EntityBase } from '../../../common/helpers/entity.base';
export declare class RideBlueprintWaypoint extends EntityBase {
    ride_blueprint_id: number;
    order: number;
    type: string;
    place_id: number;
    distance_from_prior_stop_in_miles: number;
    distance_from_prior_stop_in_mins: number;
    distance_from_destination_in_miles: number;
    distance_from_destination_in_mins: number;
    estimated_arrival_time: string;
    scheduled_arrival_time: string;
    is_archived: boolean;
    archived_at: string;
    archived_by_account_id: number;
    deleted_by_account_id: number;
}
