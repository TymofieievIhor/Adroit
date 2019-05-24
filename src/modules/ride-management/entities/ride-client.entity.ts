import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('ride_client')
export class RideClient extends EntityBase {

  @Column({nullable: false})
  ride_route_id: number;

  @Column({nullable: false})
  client_id: number;

  @Column({nullable: false})
  invoice_responsibility_percentage: number;

  @Column()
  deleted_by_account_id: number;
}