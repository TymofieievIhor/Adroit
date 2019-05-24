import { EntityBase } from '../../../common/helpers/entity.base';
export declare class RideDriverPayoutAdjustment extends EntityBase {
    ride_blueprint_assignment_id: number;
    driver_id: number;
    add_to_ride_fare_payout: number;
    deduct_from_ride_fare_payout: number;
    estimated_ride_fare_payout: number;
}
