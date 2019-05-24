import { ApiModelProperty } from '@nestjs/swagger';
import { api_examples } from '../../../common/constrant';

export class CreateDailyRecurringTripDto {
  @ApiModelProperty({example: api_examples.date})
  provided_date: string;
}
