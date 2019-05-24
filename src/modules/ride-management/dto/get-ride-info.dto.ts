import { ApiModelProperty } from '@nestjs/swagger';
import { CreateBlueprintAssignmentDto} from './create-blueprint-assignment.dto';
import { BlueprintTimeTypes } from '../../../common/helpers/constant';
import { RideDriverPayoutAdjustment } from '../entities/ride-driver-payout-adjustment.entity';

export class GetRideInfoDto {

  @ApiModelProperty({example: 1})// edit
  route_id: number;

  @ApiModelProperty({example: 'am'})
  type_name: string;

  @ApiModelProperty()
  service_start_date: string;

  @ApiModelProperty()
  service_end_date: string;

  @ApiModelProperty()
  recurring_days_drivers: {
    day: string,
    driver_id: number,
    add_to_ride_fare_payout: number,
    deduct_from_ride_fare_payout: number,
    estimated_ride_fare_payout: number }[];
}
