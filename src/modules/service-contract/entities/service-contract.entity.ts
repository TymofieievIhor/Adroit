import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';
import { ServiceContractPricing } from './service-contract-pricing.entity';

@Entity('service_contract')
export class ServiceContract extends EntityBase {
  @Column({nullable: false})
  client_id: number;

  @Column({nullable: false})
  service_contract_status_id: number;

  @Column({nullable: false})
  service_start_date: string;

  @Column({nullable: false})
  service_end_date: string;

  @Column({nullable: false})
  no_show_minimum_required_wait_in_mins: number;

  @Column({nullable: false})
  no_show_invoiced_percentage: number;

  @Column({nullable: false})
  no_show_payout_percentage: number;

  @Column({nullable: false})
  advance_cancel_cutoff_in_mins: number;

  @Column({nullable: false})
  monitor_fee_invoiced_in_increments_of_hrs: number;

  @Column({nullable: false})
  miles_included_in_invoiced_base_fee: number;

  @Column({nullable: false})
  miles_included_in_payout_base_fee: number;

  @Column({nullable: false})
  extra_wait_invoiced_in_increments_of_mins: number;

  @Column({nullable: false})
  extra_wait_payout_in_increments_of_mins: number;

  @Column()
  deleted_by_account_id: number;

  pricing: ServiceContractPricing;
}