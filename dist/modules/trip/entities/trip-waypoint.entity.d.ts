import { EntityBase } from '../../../common/helpers/entity.base';
import { TripWaypointPassenger } from './trip-waypoint-passenger.entity';
export declare class TripWaypoint extends EntityBase {
    trip_id: number;
    order: number;
    type: string;
    scheduled_arrival_time: string;
    scheduled_arrival_trip_location_id: number;
    status: string;
    arrival_time: string;
    arrival_trip_location_id: number;
    no_show_time: string;
    no_show_trip_location_id: number;
    pick_up_time: string;
    pick_up_trip_location_id: number;
    drop_off_time: string;
    drop_off_trip_location_id: number;
    additional_waiting_time: number;
    passengers: TripWaypointPassenger[];
}
