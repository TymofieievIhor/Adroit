import { ApiModelProperty } from '@nestjs/swagger';

export class CreateServiceContractPricingSimpleDto {
  @ApiModelProperty({required: true, example: 1})
  invoiced_additional_mile_fee: number;

  @ApiModelProperty({required: true, example: 1})
  payout_additional_mile_fee: number;

  @ApiModelProperty({required: true, example: 1})
  invoiced_base_fee: number;

  @ApiModelProperty({required: true, example: 1})
  payout_base_fee: number;

  @ApiModelProperty({required: true, example: 1})
  invoiced_minivan_fee: number;

  @ApiModelProperty({required: true, example: 1})
  payout_minivan_fee: number;

  @ApiModelProperty({required: true, example: 1})
  invoiced_large_vehicle_fee: number;

  @ApiModelProperty({required: true, example: 1})
  payout_large_vehicle_fee: number;

  @ApiModelProperty({required: true, example: 1})
  invoiced_wheelchair_vehicle_fee: number;

  @ApiModelProperty({required: true, example: 1})
  payout_wheelchair_vehicle_fee: number;

  @ApiModelProperty({required: true, example: 1})
  invoiced_camera_fee: number;

  @ApiModelProperty({required: true, example: 1})
  payout_camera_fee: number;

  @ApiModelProperty({required: true, example: 1})
  invoiced_seating_equipment_fee: number;

  @ApiModelProperty({required: true, example: 1})
  payout_seating_equipment_fee: number;

  @ApiModelProperty({required: true, example: 1})
  invoiced_waiting_time_fee: number;

  @ApiModelProperty({required: true, example: 1})
  payout_waiting_time_fee: number;

  @ApiModelProperty({required: true, example: 1})
  invoiced_monitor_fee: number;

  @ApiModelProperty({required: true, example: 1})
  payout_monitor_fee: number;
}