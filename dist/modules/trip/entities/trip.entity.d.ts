import { EntityBase } from '../../../common/helpers/entity.base';
import { TripDriver } from './trip-driver.entity';
import { TripVehicle } from './trip-vehicle.entity';
import { TripPlace } from './trip-place.entity';
import { TripPassenger } from './trip-passenger.entity';
import { TripWaypoint } from './trip-waypoint.entity';
export declare class Trip extends EntityBase {
    type: string;
    ride_route_id: number;
    ride_blueprint_id: number;
    status: string;
    date_of_service: string;
    type_of_service: string;
    camera_service_required: boolean;
    estimated_mileage: number;
    estimated_duration_in_minutes: number;
    map_picture_url: string;
    is_test_trip: boolean;
    is_archived: boolean;
    archived_at: string;
    archived_by_account_id: number;
    deleted_by_account_id: number;
    driver: TripDriver;
    vehicle: TripVehicle;
    places: TripPlace[];
    passengers: TripPassenger[];
    waypoints: TripWaypoint[];
}
