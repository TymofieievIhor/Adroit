import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateSimpleDriverDto {
  @ApiModelProperty({example: 1})
  @IsOptional()
  partner_id?: number;

  @ApiModelProperty({example: 123123123})
  @IsNumber()
  ssn: number;

  @ApiModelProperty({example: 'male'})
  @IsString()
  gender: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  date_of_birth: string;

  @ApiModelProperty({example: false})
  @IsBoolean()
  has_services_trips: boolean;

  @ApiModelProperty({example: false})
  @IsBoolean()
  is_suspended: boolean;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  @IsOptional()
  suspended_at?: string;
}