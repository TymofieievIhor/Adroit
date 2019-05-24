import { RideClientDto } from './ride-client.dto';
import { RidePlaceDto } from './ride-place.dto';
import { RideBlueprintDto } from './ride-blueprint.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateRideRouteDto {
  @ApiModelProperty({isArray: true, type: RideClientDto})
  clients: RideClientDto[];

  @ApiModelProperty({isArray: true, type: RidePlaceDto})
  places: RidePlaceDto[];

  @ApiModelProperty({isArray: true, type: RideBlueprintDto})
  blueprints: RideBlueprintDto[];
}
