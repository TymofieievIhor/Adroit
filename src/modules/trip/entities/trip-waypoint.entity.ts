import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';
import { TripWaypointPassenger } from './trip-waypoint-passenger.entity';

@Entity('trip_waypoint')
export class TripWaypoint extends EntityBase {
  @Column({nullable: false})
  trip_id: number;

  @Column({nullable: false})
  order: number;

  @Column({nullable: false, enum: ['pick_up', 'drop_off']})
  type: string;

  @Column({nullable: false})
  scheduled_arrival_time: string;

  @Column()
  scheduled_arrival_trip_location_id: number;

  @Column({nullable: false, enum: ['none', 'enroute', 'arrived', 'skipped', 'completed']})
  status: string;

  @Column()
  arrival_time: string;

  @Column()
  arrival_trip_location_id: number;

  @Column()
  no_show_time: string;

  @Column()
  no_show_trip_location_id: number;

  @Column()
  pick_up_time: string;

  @Column()
  pick_up_trip_location_id: number;

  @Column()
  drop_off_time: string;

  @Column()
  drop_off_trip_location_id: number;

  @Column()
  additional_waiting_time: number;

  passengers: TripWaypointPassenger[];

}