import { EntityBase } from '../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';
import { Contact } from '../contact/contact.entity';
import { Guardian } from '../guardian/guardian.entity';
import { LocationEntity } from '../location/location.entity';
import { Client } from '../client/client.entity';
import { LocationLink } from '../location/location-link.entity';

@Entity('passenger')
export class Passenger extends EntityBase {
  @Column({nullable: false})
  type: number;

  @Column({nullable: false}) // 128
  first_name: string;

  @Column({nullable: false})
  last_name: string;

  @Column()
  picture_url: string;

  @Column('date', {nullable: false})
  date_of_birth: string;

  @Column({nullable: false})
  client_id: number;

  @Column({nullable: false})
  needs_booster_seat: boolean;

  @Column({nullable: false})
  needs_car_seat: boolean;

  @Column({nullable: false})
  needs_safety_vest: boolean;

  @Column({nullable: false})
  needs_monitor: boolean;

  @Column({nullable: false})
  needs_wheelchair_assistance: boolean;

  @Column()
  instructions_note: string;

  @Column({nullable: false})
  has_been_on_trip: boolean;

  @Column()
  is_archived: boolean;

  @Column('datetime')
  archived_at: string;

  client?: Client;
  passengerAddressLink: LocationLink[];
  locations?: LocationEntity[];
  guardians?: Guardian[];
  contacts?: Contact[];
}