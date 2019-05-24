import { EntityBase } from '../../../common/helpers/entity.base';
export declare class RideClientInvoiceAdjustment extends EntityBase {
    client_id: number;
    ride_blueprint_id: number;
    discount_amount: number;
    other_service_amount: number;
    other_service_item_name: string;
    estimated_ride_fare: number;
    deleted_by_account_id: number;
}
