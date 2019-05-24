import { Column, Entity } from 'typeorm';
import { EntityBase } from '../../common/helpers/entity.base';

@Entity('client_admin')
export class ClientAdmin extends EntityBase {
  @Column()
  account_id: number;

  @Column()
  client_id: number;

  @Column({nullable: false})
  title: string;

  account?: Account;
}