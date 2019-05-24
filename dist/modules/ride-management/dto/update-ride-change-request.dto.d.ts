export declare class BlueprintTypes {
    am_blueprint?: boolean;
    am_late_start_blueprint?: boolean;
    pm_blueprint?: boolean;
    pm_early_end_blueprint?: boolean;
}
export declare class UpdateRideChangeRequestDto {
    effective_date?: string;
    place_id?: number;
    ride_route_id?: number;
    passenger_id?: number;
    blueprint_types?: BlueprintTypes;
    type_id?: string;
    note?: string;
}
