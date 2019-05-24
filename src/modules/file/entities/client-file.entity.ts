import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('client_file')
export class ClientFile extends EntityBase {
  @Column({nullable: false})
  client_id: number;

  @Column({nullable: false})
  file_id: number;
}