import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('trip_place')
export class TripPlace extends EntityBase {
  @Column({nullable: false})
  place_id: number;

  @Column({nullable: false})
  trip_id: number;

  @Column({nullable: false})
  type_text_value: string;

  @Column({nullable: false})
  type_name: string;

  @Column({nullable: false})
  name: number;
}