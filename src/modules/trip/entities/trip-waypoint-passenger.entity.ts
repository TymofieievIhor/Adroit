import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('trip_waypoint_passenger')
export class TripWaypointPassenger extends EntityBase {
  @Column({nullable: false})
  trip_waypoint_id: number;

  @Column({nullable: false})
  trip_passenger_id: number;

  @Column({nullable: false, enum: ['none', 'picked_up', 'dropped_off', 'no_show', 'canceled_late', 'canceled_in_advance']})
  status: string;

}