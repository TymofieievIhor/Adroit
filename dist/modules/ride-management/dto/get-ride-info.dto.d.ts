export declare class GetRideInfoDto {
    route_id: number;
    type_name: string;
    service_start_date: string;
    service_end_date: string;
    recurring_days_drivers: {
        day: string;
        driver_id: number;
        add_to_ride_fare_payout: number;
        deduct_from_ride_fare_payout: number;
        estimated_ride_fare_payout: number;
    }[];
}
