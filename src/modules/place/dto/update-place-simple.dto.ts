import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdatePlaceSimpleDto {
  @ApiModelProperty({example: 'Burlingame Highschool'})
  @IsString()
  @IsOptional()
  name?: string;

  @ApiModelProperty({example: 1})
  @IsString()
  @IsOptional()
  time_zone_id?: number;

  @ApiModelProperty({example: '+71232343'})
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiModelProperty({example: '123'})
  @IsOptional()
  phone_extension?: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  @IsOptional()
  default_start_time?: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  @IsOptional()
  default_end_time?: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  @IsOptional()
  default_late_start_time?: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  @IsOptional()
  default_early_end_time?: string;
}