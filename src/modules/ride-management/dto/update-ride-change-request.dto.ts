import { ApiModelProperty } from '@nestjs/swagger';

export class BlueprintTypes {
  am_blueprint?: boolean;
  am_late_start_blueprint?: boolean;
  pm_blueprint?: boolean;
  pm_early_end_blueprint?: boolean;
}

export class UpdateRideChangeRequestDto {
  @ApiModelProperty({example: new Date()})
  effective_date?: string;

  @ApiModelProperty()
  place_id?: number;

  @ApiModelProperty()
  ride_route_id?: number;

  @ApiModelProperty()
  passenger_id?: number;

  @ApiModelProperty({type: BlueprintTypes})
  blueprint_types?: BlueprintTypes;

  @ApiModelProperty()
  type_id?: string;

  @ApiModelProperty()
  note?: string;
}