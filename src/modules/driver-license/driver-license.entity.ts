import { Column, Entity } from 'typeorm';
import { LocationEntity } from '../location/location.entity';
import { EntityBase } from '../../common/helpers/entity.base';

@Entity()
export class DriverLicense extends EntityBase {
  @Column({nullable: false})
  number: string;

  @Column('datetime', {nullable: false})
  date_of_expiration: string;

  @Column({nullable: false})
  issued_by_state: string;

  @Column({nullable: false})
  weight_in_pounds: number;

  @Column({nullable: false})
  height_in_feet: number;

  @Column({nullable: false})
  height_in_inches: number;

  @Column({nullable: false})
  hair_color: string;

  @Column({nullable: false})
  eye_color: string;

  @Column({nullable: false})
  location_id: number;

  location: LocationEntity;
}