import { Column, Entity } from 'typeorm';
import { EntityBase } from '../../../common/helpers/entity.base';

@Entity('file')
export class File extends EntityBase{
  @Column({nullable: false})
  name: string;

  @Column({nullable: false})
  cdn_url: string;

  @Column({nullable: false})
  key: string;

  @Column()
  deleted_by_account_id: number;
}