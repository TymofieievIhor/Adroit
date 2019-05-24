import { ApiModelProperty } from '@nestjs/swagger';
import { api_examples } from '../../../common/constrant';

export class CreateServiceContractSimpleDto {
  @ApiModelProperty({required: true, example: api_examples.date})
  service_start_date: string;

  @ApiModelProperty({required: true, example: api_examples.date})
  service_end_date: string;

  @ApiModelProperty({required: true, example: 1})
  no_show_minimum_required_wait_in_mins: number;

  @ApiModelProperty({required: true, example: 1})
  no_show_invoiced_percentage: number;

  @ApiModelProperty({required: true, example: 1})
  no_show_payout_percentage: number;

  @ApiModelProperty({required: true, example: 1})
  advance_cancel_cutoff_in_mins: number;

  @ApiModelProperty({required: true, example: 1})
  monitor_fee_invoiced_in_increments_of_hrs: number;

  @ApiModelProperty({required: true, example: 1})
  miles_included_in_invoiced_base_fee: number;

  @ApiModelProperty({required: true, example: 1})
  miles_included_in_payout_base_fee: number;

  @ApiModelProperty({required: true, example: 1})
  extra_wait_invoiced_in_increments_of_mins: number;

  @ApiModelProperty({required: true, example: 1})
  extra_wait_payout_in_increments_of_mins: number;
}