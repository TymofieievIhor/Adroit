import { Column, Entity } from 'typeorm';
import { EntityBase } from '../../common/helpers/entity.base';
import { VehicleInsurance } from '../vehicle-insurance/vehicle-insurance.entity';

@Entity()
export class Vehicle extends EntityBase {
  @Column({nullable: false})
  make: string;

  @Column({nullable: false})
  model: string;

  @Column({nullable: false})
  type: string;

  @Column({nullable: false})
  year: number;

  @Column({nullable: false})
  color: string;

  @Column({nullable: false})
  license_plate: string;

  @Column('datetime', {nullable: false})
  registration_expiry_date: string;

  @Column({nullable: false})
  vin: number;

  @Column()
  driver_id: number;

  @Column({nullable: false})
  vehicle_insurance_id: number;

  @Column()
  picture_url: string;

  vehicle_insurance: VehicleInsurance;
}