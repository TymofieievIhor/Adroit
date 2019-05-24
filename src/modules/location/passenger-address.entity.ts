import { EntityBase } from '../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity('passenger_address')
export class PassengerAddress extends EntityBase {
  @Column({nullable: false})
  location_id: number;

  @Column({nullable: false})
  passenger_id: number;

  location: LocationEntity;
}