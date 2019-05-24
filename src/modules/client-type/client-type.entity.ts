import { Column, Entity } from 'typeorm';
import { EntityBase } from '../../common/helpers/entity.base';

@Entity('client_type')
export class ClientType extends EntityBase {
  @Column({nullable: false, unique: true})
  value: number;

  @Column({nullable: false})
  text_value: string;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false})
  display_in_user_interface: boolean = true;
}