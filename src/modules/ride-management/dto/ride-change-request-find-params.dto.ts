import { ApiModelProperty } from '@nestjs/swagger';

export class RideChangeRequestFindParamsDto {
  @ApiModelProperty({required: false})
  place_name?: string;

  @ApiModelProperty({required: false})
  passenger_name?: string;

  @ApiModelProperty({required: false})
  route_id?: number;
}