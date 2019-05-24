import { EntityBase } from '../../../common/helpers/entity.base';
import { Entity, Column } from 'typeorm';

@Entity('ride_blueprint')
export class RideBlueprint extends EntityBase {
  @Column({nullable: false})
  ride_route_id: number;

  @Column()
  type_text_value: string;

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

  @Column({nullable: false})
  is_active: boolean;

  @Column()
  is_archived: boolean;

  @Column('datetime')
  archived_at: string;

  @Column()
  archived_by_account_id: number;

  @Column()
  deleted_by_account_id: number;
}