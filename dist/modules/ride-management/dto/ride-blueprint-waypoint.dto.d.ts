export declare class RideBlueprintWaypointDto {
    id?: number;
    type: string;
    place_id?: number;
    distance_in_miles: number;
    distance_in_mins: number;
    eta: string;
    sta: string;
    am_start?: string;
    location_id?: number;
    waypoint_passengers: {
        passenger_id: number;
        waypoint_passenger_id?: number;
    }[];
}
