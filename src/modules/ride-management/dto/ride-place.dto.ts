import { RidePassengerDto } from './ride-passenger.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class RidePlaceDto {
  @ApiModelProperty({example: 1})
  id?: number;

  @ApiModelProperty({example: 1})
  place_id: number;

  @ApiModelProperty({type: RidePassengerDto, isArray: true})
  passengers: RidePassengerDto[];
}