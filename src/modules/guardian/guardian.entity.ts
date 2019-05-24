import { EntityBase } from '../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('guardian')
export class Guardian extends EntityBase {
  @Column({nullable: false})
  account_id: number;

  @Column({nullable: false})
  passenger_id: number;

  @Column()
  relationship: string;

  account?: Account;
}