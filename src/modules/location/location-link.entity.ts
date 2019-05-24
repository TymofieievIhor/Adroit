import { Entity, Column } from 'typeorm';
import { EntityBase } from '../../common/helpers/entity.base';

@Entity('location_link')
export class LocationLink extends EntityBase {

  @Column()
  location_id: number;

  @Column()
  bank_account_id: number;

  @Column()
  trip_id: number;

  @Column()
  partner_id: number;

  @Column()
  client_id: number;

  @Column()
  place_id: number;

  @Column()
  passenger_id: number;
}