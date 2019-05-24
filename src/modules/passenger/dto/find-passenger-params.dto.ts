import { ApiModelProperty } from '@nestjs/swagger';

export class FindPassengerParamsDto {
  @ApiModelProperty({required: false})
  first_name?: string;

  @ApiModelProperty({required: false})
  last_name?: string;

  @ApiModelProperty({required: false})
  paying_client?: string;

  @ApiModelProperty({required: false})
  type?: string;

  client_id?: number;
}