export declare class RecurringDaysDriverMap {
    day: string;
    driver_id: number;
    add_pay: number;
    deduct_pay: number;
    estimated_driver_payout: number;
}
export declare class CreateBlueprintAssignmentDto {
    service_start_date: string;
    service_end_date: string;
    recurring_days_drivers: RecurringDaysDriverMap[];
}
