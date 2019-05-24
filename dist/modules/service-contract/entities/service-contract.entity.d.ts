import { EntityBase } from '../../../common/helpers/entity.base';
import { ServiceContractPricing } from './service-contract-pricing.entity';
export declare class ServiceContract extends EntityBase {
    client_id: number;
    service_contract_status_id: number;
    service_start_date: string;
    service_end_date: string;
    no_show_minimum_required_wait_in_mins: number;
    no_show_invoiced_percentage: number;
    no_show_payout_percentage: number;
    advance_cancel_cutoff_in_mins: number;
    monitor_fee_invoiced_in_increments_of_hrs: number;
    miles_included_in_invoiced_base_fee: number;
    miles_included_in_payout_base_fee: number;
    extra_wait_invoiced_in_increments_of_mins: number;
    extra_wait_payout_in_increments_of_mins: number;
    deleted_by_account_id: number;
    pricing: ServiceContractPricing;
}
