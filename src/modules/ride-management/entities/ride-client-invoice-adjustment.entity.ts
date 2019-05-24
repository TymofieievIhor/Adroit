import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('ride_client_invoice_adjustment')
export class RideClientInvoiceAdjustment extends EntityBase {
  @Column({nullable: false})
  client_id: number;

  @Column({nullable: false})
  ride_blueprint_id: number;

  @Column({nullable: false})
  discount_amount: number;

  @Column({nullable: false})
  other_service_amount: number;

  @Column() // 128
  other_service_item_name: string;

  @Column({nullable: false})
  estimated_ride_fare: number;

  @Column()
  deleted_by_account_id: number;
}