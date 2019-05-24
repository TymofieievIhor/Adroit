import { ApiModelProperty } from '@nestjs/swagger';
import { api_examples } from '../../../common/constrant';

export class FindTripParamsDto {
  @ApiModelProperty({required: true, example: 'AM'})
  type: 'AM' | 'PM';

  @ApiModelProperty({required: true, example: api_examples.date})
  date_of_service: string;

  @ApiModelProperty({required: false})
  search?: string;
}