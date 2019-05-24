import { EntityBase } from '../../../common/helpers/entity.base';
export declare class RideBlueprint extends EntityBase {
    ride_route_id: number;
    type_text_value: string;
    type_of_service: string;
    camera_service_required: boolean;
    estimated_mileage: number;
    estimated_duration_in_minutes: number;
    map_picture_url: string;
    recurs_on_monday: boolean;
    recurs_on_tuesday: boolean;
    recurs_on_wednesday: boolean;
    recurs_on_thursday: boolean;
    recurs_on_friday: boolean;
    recurs_on_saturday: boolean;
    recurs_on_sunday: boolean;
    is_active: boolean;
    is_archived: boolean;
    archived_at: string;
    archived_by_account_id: number;
    deleted_by_account_id: number;
}
