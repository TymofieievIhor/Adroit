import { EntityBase } from '../../../common/helpers/entity.base';
import { Entity, Column } from 'typeorm';
import { Passenger } from '../../passenger/passenger.entity';

@Entity('ride_place_passenger')
export class RidePlacePassenger extends EntityBase {
  @Column({nullable: false})
  ride_route_id: number;

  @Column({nullable: false})
  passenger_id: number;

  @Column({nullable: false})
  place_id: number;

  @Column()
  deleted_by_account_id: number;

  passenger: Passenger;
}