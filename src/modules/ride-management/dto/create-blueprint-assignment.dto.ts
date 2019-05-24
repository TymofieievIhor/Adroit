import { ApiModelProperty } from '@nestjs/swagger';
import { api_examples } from '../../../common/constrant';

export class RecurringDaysDriverMap {

  @ApiModelProperty({example: 'monday'})
  day: string;

  @ApiModelProperty({example: 1})
  driver_id: number;

  @ApiModelProperty({example: 100})
  add_pay: number;

  @ApiModelProperty({example: 100})
  deduct_pay: number;

  @ApiModelProperty({example: 1000})
  estimated_driver_payout: number;
}

export class CreateBlueprintAssignmentDto {
  @ApiModelProperty({example: api_examples.date, required: true})
  service_start_date: string;

  @ApiModelProperty({example: api_examples.date, required: true})
  service_end_date: string;

  @ApiModelProperty({required: true, type: RecurringDaysDriverMap, isArray: true})
  recurring_days_drivers: RecurringDaysDriverMap[];
}
