import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('trip_driver')
export class TripDriver extends EntityBase {
  @Column({nullable: false})
  driver_account_id: number;

  @Column({nullable: false})
  driver_id: number;

  @Column({nullable: false})
  trip_id: number;

  @Column({nullable: false})
  first_name: string;

  @Column({nullable: false})
  last_name: string;

  @Column({nullable: false})
  phone_number: string;

  @Column()
  picture_url: string;

  @Column({nullable: false})
  driver_email: string;

  @Column({nullable: false})
  partner_name: string;

  @Column({nullable: false})
  partner_id: number;

  @Column({nullable: false})
  is_switched: boolean;

  @Column('datetime')
  switched_at: string;

  @Column()
  switched_by_account_id: number;
}