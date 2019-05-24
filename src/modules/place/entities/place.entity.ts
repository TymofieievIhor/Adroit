import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';
import { LocationEntity } from '../../location/location.entity';
import { TimeZone } from '../../time-zone/time-zone.entity';

@Entity('place')
export class Place extends EntityBase {
  @Column({nullable: false})
  name: string;

  @Column({nullable: false})
  time_zone_id: number;

  @Column({nullable: false, unique: true})
  phone_number: string;

  @Column({nullable: true})
  phone_extension: string;

  @Column({nullable: false})
  location_id: number;

  @Column({nullable: false, type: 'datetime'})
  default_start_time: string;

  @Column({nullable: false, type: 'datetime'})
  default_end_time: string;

  @Column({nullable: false, type: 'datetime'})
  default_late_start_time: string;

  @Column({nullable: false, type: 'datetime'})
  default_early_end_time: string;

  @Column({nullable: false, default: false})
  is_archived: boolean;

  @Column('datetime')
  archived_at: string;

  location: LocationEntity;
  time_zone: TimeZone;
}