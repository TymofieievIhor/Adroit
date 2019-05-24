import { Place } from '../../place/entities/place.entity';
import { Passenger } from '../../passenger/passenger.entity';
export declare class RideChangeRequestFindResponseDto {
    effective_date: string;
    type: string;
    route_id?: number;
    place?: Place;
    passenger?: Passenger;
    blueprints: string;
    note?: string;
}
