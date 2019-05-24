import { EntityBase } from '../../../common/helpers/entity.base';
import { Entity, Column } from 'typeorm';

@Entity('ride_change_request')
export class RideChangeRequest extends EntityBase {

  @Column('date', {nullable: false})
  effective_date: string;

  @Column({nullable: false})
  ride_change_request_type_id: number;

  @Column()
  ride_route_id: number;

  @Column()
  place_id: number;

  @Column()
  passenger_id: number;

  @Column({nullable: false})
  apply_to_am_blueprint: boolean;

  @Column({nullable: false})
  apply_to_am_late_start_blueprint: boolean;

  @Column({nullable: false})
  apply_to_pm_blueprint: boolean;

  @Column({nullable: false})
  apply_to_pm_early_end_blueprint: boolean;

  @Column()
  note: string;

  @Column()
  deleted_by_account_id: number;
}