import { EntityBase } from '../../../common/helpers/entity.base';
export declare class RideBlueprintWaypointPassenger extends EntityBase {
    ride_blueprint_waypoint_id: number;
    passenger_id: number;
    location_link_id: number;
    is_archived: boolean;
    archived_at: string;
    archived_by_account_id: number;
    deleted_by_account_id: number;
}
