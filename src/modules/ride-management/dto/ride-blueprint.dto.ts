import { IsOptional, IsString } from 'class-validator';
import { RideBlueprintWaypointDto } from './ride-blueprint-waypoint.dto';
import { RideClientAdjustmentDto } from './ride-client-adjustment.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class DaysOfService {
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
  sunday?: boolean;
}

export class RideBlueprintDto {
  @ApiModelProperty({example: 1})
  id?: number;

  @ApiModelProperty({example: 'am'})
  type: string;

  @ApiModelProperty({example: {monday: true}, type: DaysOfService})
  days_of_service: DaysOfService;

  @ApiModelProperty({example: 'minivan_vehicle'})
  type_of_service: string;

  @ApiModelProperty({example: true})
  camera_service_required: boolean;

  @ApiModelProperty({ example: 'https://cdn.goadroit.com/example.jpg' })
  @IsString()
  @IsOptional()
  map_picture_url?: string;

  @ApiModelProperty({type: RideClientAdjustmentDto, isArray: true})
  client_adjustments: RideClientAdjustmentDto[];

  @ApiModelProperty({type: RideBlueprintWaypointDto, isArray: true})
  ride_map: RideBlueprintWaypointDto[];
}
