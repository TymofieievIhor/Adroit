import { RideBlueprintWaypointDto } from './ride-blueprint-waypoint.dto';
import { RideClientAdjustmentDto } from './ride-client-adjustment.dto';
export declare class DaysOfService {
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    sunday?: boolean;
}
export declare class RideBlueprintDto {
    id?: number;
    type: string;
    days_of_service: DaysOfService;
    type_of_service: string;
    camera_service_required: boolean;
    map_picture_url?: string;
    client_adjustments: RideClientAdjustmentDto[];
    ride_map: RideBlueprintWaypointDto[];
}
