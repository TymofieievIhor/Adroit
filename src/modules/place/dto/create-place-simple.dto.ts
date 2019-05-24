import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreatePlaceSimpleDto {
  @ApiModelProperty({example: 'Burlingame Highschool'})
  @IsString()
  name: string;

  @ApiModelProperty({example: 1})
  @IsString()
  time_zone_id: number;

  @ApiModelProperty({example: '+71232343'})
  @IsString()
  phone_number: string;

  @ApiModelProperty({example: '123'})
  @IsOptional()
  phone_extension?: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  default_start_time: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  default_end_time: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  default_late_start_time: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  default_early_end_time: string;
}