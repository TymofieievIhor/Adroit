import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('driver_file')
export class DriverFile extends EntityBase {
  @Column({nullable: false})
  driver_id: number;

  @Column({nullable: false})
  file_id: number;
}