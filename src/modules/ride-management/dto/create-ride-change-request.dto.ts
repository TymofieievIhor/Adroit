import { ApiModelProperty } from '@nestjs/swagger';

export class BlueprintTypes {
  @ApiModelProperty({example: true})
  am_blueprint?: boolean;

  @ApiModelProperty({example: false})
  am_late_start_blueprint?: boolean;

  @ApiModelProperty({example: false})
  pm_blueprint?: boolean;

  @ApiModelProperty({example: false})
  pm_early_end_blueprint?: boolean;
}

export class CreateRideChangeRequestDto {
  @ApiModelProperty({required: true, example: new Date()})
  effective_date: string;

  @ApiModelProperty({example: 1})
  place_id?: number;

  @ApiModelProperty({example: 1})
  ride_route_id?: number;

  @ApiModelProperty({example: 1})
  passenger_id?: number;

  @ApiModelProperty({required: true, type: BlueprintTypes})
  blueprint_types: BlueprintTypes;

  @ApiModelProperty({example: 1, required: true})
  type_id: number;

  @ApiModelProperty({example: 'note'})
  note?: string;
}