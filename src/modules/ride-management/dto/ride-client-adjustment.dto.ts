import { ApiModelProperty } from '@nestjs/swagger';

export class RideClientAdjustmentDto {
  @ApiModelProperty({example: 1})
  id?: number;

  @ApiModelProperty({example: 1})
  client_id: number;

  @ApiModelProperty({example: 0})
  discount_amount: number;

  @ApiModelProperty({example: 0})
  other_service_amount: number;

  @ApiModelProperty({example: 'other service item'})
  other_service_item_name?: string;

  @ApiModelProperty({example: 0})
  estimated_ride_fare: number;
}