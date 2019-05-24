import { ApiModelProperty } from '@nestjs/swagger';

export class RidePassengerDto {
  @ApiModelProperty({example: 1})
  id?: number;

  @ApiModelProperty({example: 1})
  passenger_id: number;

  @ApiModelProperty({example: 1, description: 'passenger address id'})
  location_id: number;
}