import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('ride_driver_payout_adjustment')
export class RideDriverPayoutAdjustment extends EntityBase {
  @Column({nullable: false})
  ride_blueprint_assignment_id: number;

  @Column({nullable: false})
  driver_id: number;

  @Column({nullable: false})
  add_to_ride_fare_payout: number;

  @Column({nullable: false})
  deduct_from_ride_fare_payout: number;

  @Column({nullable: false})
  estimated_ride_fare_payout: number;
}