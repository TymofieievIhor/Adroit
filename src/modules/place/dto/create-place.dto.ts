import { CreatePlaceSimpleDto } from './create-place-simple.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateLocationDto } from '../../location/dto/create-location.dto';

export class CreatePlaceDto {
  @ApiModelProperty({required: true})
  place: CreatePlaceSimpleDto;

  @ApiModelProperty({required: true})
  location: CreateLocationDto;
}