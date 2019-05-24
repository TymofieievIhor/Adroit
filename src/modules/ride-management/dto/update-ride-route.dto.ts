import { RideClientDto } from './ride-client.dto';
import { RidePlaceDto } from './ride-place.dto';
import { RideBlueprintDto } from './ride-blueprint.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateRideRouteDto {
  @ApiModelProperty({isArray: true, type: RideClientDto, required: false})
  clients?: RideClientDto[];

  @ApiModelProperty({isArray: true, type: RidePlaceDto, required: false})
  places?: RidePlaceDto[];

  @ApiModelProperty({isArray: true, type: RideBlueprintDto, required: false})
  blueprints?: RideBlueprintDto[];
}
