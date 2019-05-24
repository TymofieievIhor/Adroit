import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('ride_blueprint_assignment')
export class RideBlueprintAssignment extends EntityBase {
  @Column({nullable: false})
  ride_blueprint_id: number;

  @Column({nullable: false})
  service_start_date: string;

  @Column({nullable: false})
  service_end_date: string;

  @Column({nullable: false})
  recurs_on_monday: boolean;

  @Column({nullable: false})
  recurs_on_tuesday: boolean;

  @Column({nullable: false})
  recurs_on_wednesday: boolean;

  @Column({nullable: false})
  recurs_on_thursday: boolean;

  @Column({nullable: false})
  recurs_on_friday: boolean;

  @Column({nullable: false})
  recurs_on_saturday: boolean;

  @Column({nullable: false})
  recurs_on_sunday: boolean;

  @Column()
  monday_driver_id: number;

  @Column()
  tuesday_driver_id: number;

  @Column()
  wednesday_driver_id: number;

  @Column()
  thursday_driver_id: number;

  @Column()
  friday_driver_id: number;

  @Column()
  saturday_driver_id: number;

  @Column()
  sunday_driver_id: number;

  @Column()
  is_archived: boolean;

  @Column('datetime')
  archived_at: string;
}