import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('trip_passenger')
export class TripPassenger extends EntityBase {
  @Column({nullable: false})
  passenger_id: number;

  @Column({nullable: false})
  trip_id: number;

  @Column({nullable: false})
  type_text_value: string;

  @Column({nullable: false})
  type_name: string;

  @Column({nullable: false})
  first_name: string;

  @Column({nullable: false})
  last_name: string;

  @Column({nullable: false})
  picture_url: string;

  @Column({nullable: false})
  needs_booster_seat: boolean;

  @Column({nullable: false})
  needs_car_seat: boolean;

  @Column({nullable: false})
  needs_safety_vest: boolean;

  @Column({nullable: false})
  needs_monitor: boolean;
}