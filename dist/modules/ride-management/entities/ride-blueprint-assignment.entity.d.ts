import { EntityBase } from '../../../common/helpers/entity.base';
export declare class RideBlueprintAssignment extends EntityBase {
    ride_blueprint_id: number;
    service_start_date: string;
    service_end_date: string;
    recurs_on_monday: boolean;
    recurs_on_tuesday: boolean;
    recurs_on_wednesday: boolean;
    recurs_on_thursday: boolean;
    recurs_on_friday: boolean;
    recurs_on_saturday: boolean;
    recurs_on_sunday: boolean;
    monday_driver_id: number;
    tuesday_driver_id: number;
    wednesday_driver_id: number;
    thursday_driver_id: number;
    friday_driver_id: number;
    saturday_driver_id: number;
    sunday_driver_id: number;
    is_archived: boolean;
    archived_at: string;
}
