import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateGuardianDto {
  @ApiModelProperty({example: 'Mother'})
  @IsString()
  @IsOptional()
  relationship?: string;

  @ApiModelProperty({example: 1})
  @IsNumber()
  @IsOptional()
  id?: number;

  passenger_id?: number;
}