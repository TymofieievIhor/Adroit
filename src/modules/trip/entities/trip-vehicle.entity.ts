import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('trip_vehicle')
export class TripVehicle extends EntityBase {
  @Column({nullable: false})
  vehicle_id: number;

  @Column({nullable: false})
  trip_id: number;

  @Column({nullable: false}) //64
  license_plate: string;

  @Column({nullable: false}) //128
  make: string;

  @Column({nullable: false})
  model: string;

  @Column({nullable: false})
  type: string;

  @Column({nullable: false})
  color: string;

  @Column() //2048
  picture_url: string;

  @Column({nullable: false})
  is_switched: boolean;

  @Column('datetime')
  switched_at: string;

  @Column()
  switched_by_account_id: number;
}