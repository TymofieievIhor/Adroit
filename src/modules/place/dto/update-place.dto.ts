import { ApiModelProperty } from '@nestjs/swagger';
import { UpdatePlaceSimpleDto } from './update-place-simple.dto';
import { UpdateLocationDto } from '../../location/dto/update-location.dto';

export class UpdatePlaceDto {
  @ApiModelProperty()
  place: UpdatePlaceSimpleDto;

  @ApiModelProperty()
  location: UpdateLocationDto;
}