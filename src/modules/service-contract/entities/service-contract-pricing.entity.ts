import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('service_contract_pricing')
export class ServiceContractPricing extends EntityBase {

  @Column({nullable: false})
  service_contract_id: number;

  @Column({nullable: false})
  invoiced_additional_mile_fee: number;

  @Column({nullable: false})
  payout_additional_mile_fee: number;

  @Column({nullable: false})
  invoiced_base_fee: number;

  @Column({nullable: false})
  payout_base_fee: number;

  @Column({nullable: false})
  invoiced_minivan_fee: number;

  @Column({nullable: false})
  payout_minivan_fee: number;

  @Column({nullable: false})
  invoiced_large_vehicle_fee: number;

  @Column({nullable: false})
  payout_large_vehicle_fee: number;

  @Column({nullable: false})
  invoiced_wheelchair_vehicle_fee: number;

  @Column({nullable: false})
  payout_wheelchair_vehicle_fee: number;

  @Column({nullable: false})
  invoiced_camera_fee: number;

  @Column({nullable: false})
  payout_camera_fee: number;

  @Column({nullable: false})
  invoiced_seating_equipment_fee: number;

  @Column({nullable: false})
  payout_seating_equipment_fee: number;

  @Column({nullable: false})
  invoiced_waiting_time_fee: number;

  @Column({nullable: false})
  payout_waiting_time_fee: number;

  @Column({nullable: false})
  invoiced_monitor_fee: number;

  @Column({nullable: false})
  payout_monitor_fee: number;
}