import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateClientTypeDto {
  @ApiModelProperty({example: 11})
  @IsNumber()
  value: number;

  @ApiModelProperty({example: 'admin_family'})
  @IsString()
  text_value: string;

  @ApiModelProperty({example: 'Admin Family'})
  @IsString()
  name: string;

  @ApiModelProperty({example: true})
  @IsBoolean()
  display_in_user_interface: boolean;
}