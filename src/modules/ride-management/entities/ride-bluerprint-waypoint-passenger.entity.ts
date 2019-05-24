import { EntityBase } from '../../../common/helpers/entity.base';
import { Entity, Column } from 'typeorm';

@Entity('ride_blueprint_waypoint_passenger')
export class RideBlueprintWaypointPassenger extends EntityBase {
  @Column({nullable: false})
  ride_blueprint_waypoint_id: number;

  @Column({nullable: false})
  passenger_id: number;

  @Column({nullable: false})
  location_link_id: number;

  @Column()
  is_archived: boolean;

  @Column('datetime')
  archived_at: string;

  @Column()
  archived_by_account_id: number;

  @Column()
  deleted_by_account_id: number;
}