import { EntityBase } from '../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('time_zone')
export class TimeZone extends EntityBase {
  @Column({nullable: false, unique: true})
  offset: number;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false})
  abbreviation: string;
}