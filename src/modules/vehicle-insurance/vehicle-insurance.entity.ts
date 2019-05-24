import { Column, Entity } from 'typeorm';
import { EntityBase } from '../../common/helpers/entity.base';

@Entity()
export class VehicleInsurance extends EntityBase {
  @Column({nullable: false})
  insurance_company_name: string;

  @Column({nullable: false})
  policy_number: number;

  @Column('datetime', {nullable: false})
  effective_date: string;

  @Column('datetime', {nullable: false})
  expiration_date: string;
}