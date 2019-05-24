import { ApiModelProperty } from '@nestjs/swagger';

export class FindRideRouteParamsDto {
  @ApiModelProperty({required: false})
  id?: number;
}