import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';
import { TripDriver } from './trip-driver.entity';
import { TripVehicle } from './trip-vehicle.entity';
import { TripPlace } from './trip-place.entity';
import { TripPassenger } from './trip-passenger.entity';
import { TripWaypoint } from './trip-waypoint.entity';
import { TRIP_STATUSES } from '../../../common/helpers/constant';

@Entity('trip')
export class Trip extends EntityBase {
  @Column({nullable: false, enum: ['recurring', 'scheduled', 'on_demand']})
  type: string;

  @Column({nullable: false})
  ride_route_id: number;

  @Column({nullable: false})
  ride_blueprint_id: number;

  @Column({
    nullable: false,
    enum: Object.values(TRIP_STATUSES),
  })
  status: string;

  @Column({nullable: false, type: 'date'})
  date_of_service: string;

  @Column({nullable: false, enum: ['sedan_vehicle', 'minivan_vehicle', 'large_vehicle', 'wheelchair_vehicle']})
  type_of_service: string;

  @Column({nullable: false})
  camera_service_required: boolean;

  @Column({nullable: false})
  estimated_mileage: number;

  @Column({nullable: false})
  estimated_duration_in_minutes: number;

  @Column()
  map_picture_url: string;

  @Column({nullable: false, default: false})
  is_test_trip: boolean;

  @Column()
  is_archived: boolean;

  @Column('datetime')
  archived_at: string;

  @Column()
  archived_by_account_id: number;

  @Column()
  deleted_by_account_id: number;

  driver: TripDriver;
  vehicle: TripVehicle;
  places: TripPlace[];
  passengers: TripPassenger[];
  waypoints: TripWaypoint[];
}
