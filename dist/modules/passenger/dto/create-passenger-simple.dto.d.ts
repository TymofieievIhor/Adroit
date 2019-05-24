export declare class CreatePassengerSimpleDto {
    first_name: string;
    last_name: string;
    picture_url: string;
    date_of_birth: string;
    client_id: number;
    needs_booster_seat?: boolean;
    needs_car_seat?: boolean;
    needs_safety_vest?: boolean;
    needs_monitor?: boolean;
    needs_wheelchair_assistance?: boolean;
    instructions_note?: string;
    has_been_on_trip?: boolean;
}
