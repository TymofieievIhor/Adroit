import { EntityBase } from '../../../common/helpers/entity.base';
import { Entity, Column } from 'typeorm';

@Entity('ride_place')
export class RidePlace extends EntityBase {
  @Column({nullable: false})
  ride_route_id: number;

  @Column({nullable: false})
  place_id: number;

  @Column()
  deleted_by_account_id: number;
}