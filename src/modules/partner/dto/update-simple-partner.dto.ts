import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateSimplePartnerDto {
  @ApiModelProperty({example: 'partner1'})
  @IsString()
  @IsOptional()
  name?: string;

  @ApiModelProperty({example: 2341233})
  @IsNumber()
  @IsOptional()
  tin?: number;
}