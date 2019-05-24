import { EntityBase } from '../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';
import { Client } from '../client/client.entity';

@Entity('contact')
export class Contact extends EntityBase {
  @Column({nullable: false})
  first_name: string;

  @Column({nullable: false})
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column({nullable: true})
  phone_number: string;

  @Column({nullable: true})
  phone_extension: string;

  @Column()
  title_or_relationship: string;

  @Column()
  client_id: number;

  @Column()
  passenger_id: number;

  @Column()
  deleted_by_account_id: number;

  client: Client;

}