import { EntityBase } from '../../../common/helpers/entity.base';
import { Entity, Column } from 'typeorm';

@Entity('ride_blueprint_waypoint')
export class RideBlueprintWaypoint extends EntityBase {

  @Column({nullable: false})
  ride_blueprint_id: number;

  @Column({nullable: false})
  order: number;

  @Column({nullable: false, enum: ['pick_up', 'drop_off']})
  type: string;

  @Column()
  place_id: number;

  @Column({nullable: false}) // float
  distance_from_prior_stop_in_miles: number;

  @Column({nullable: false})
  distance_from_prior_stop_in_mins: number;

  @Column({nullable: false})
  distance_from_destination_in_miles: number;

  @Column({nullable: false})
  distance_from_destination_in_mins: number;

  @Column('datetime', {nullable: false})
  estimated_arrival_time: string;

  @Column('datetime', {nullable: false})
  scheduled_arrival_time: string;

  @Column()
  is_archived: boolean;

  @Column('datetime')
  archived_at: string;

  @Column()
  archived_by_account_id: number;

  @Column()
  deleted_by_account_id: number;
}