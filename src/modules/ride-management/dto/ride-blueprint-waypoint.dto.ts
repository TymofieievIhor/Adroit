import { ApiModelProperty } from '@nestjs/swagger';

export class RideBlueprintWaypointDto {
  @ApiModelProperty({example: 1})
  id?: number;

  @ApiModelProperty({example: 'pick_up'})
  type: string;

  @ApiModelProperty({example: 1})
  place_id?: number;

  @ApiModelProperty({example: 100})
  distance_in_miles: number;

  @ApiModelProperty({example: 100})
  distance_in_mins: number;

  @ApiModelProperty({example: new Date()})
  eta: string;

  @ApiModelProperty({example: new Date()})
  sta: string;

  @ApiModelProperty()
  am_start?: string; // when the school starts working if type is am blueprint

  @ApiModelProperty({example: 1, description: 'passenger address'})
  location_id?: number;

  @ApiModelProperty({example: [{passenger_id: 1, waypoint_passenger_id: 1}, {passenger_id: 2}]})
  waypoint_passengers: {passenger_id: number, waypoint_passenger_id?: number}[];
}