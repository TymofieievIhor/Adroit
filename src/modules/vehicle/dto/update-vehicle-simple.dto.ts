import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateVehicleSimpleDto {
  @ApiModelProperty({example: 'Nissan'})
  @IsString()
  @IsOptional()
  make?: string;

  @ApiModelProperty({example: 'Leaf'})
  @IsString()
  @IsOptional()
  model?: string;

  @ApiModelProperty({example: 'Sedan'})
  @IsString()
  @IsOptional()
  type?: string;

  @ApiModelProperty({example: 2018})
  @IsNumber()
  @IsOptional()
  year?: number;

  @ApiModelProperty({example: 'black'})
  @IsString()
  @IsOptional()
  color?: string;

  @ApiModelProperty({example: 'F43K435'})
  @IsString()
  @IsOptional()
  license_plate?: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  @IsOptional()
  registration_expiry_date?: string;

  @ApiModelProperty({example: 123234345})
  @IsNumber()
  @IsOptional()
  vin?: number;

  @ApiModelProperty({example: './example.jpg'})
  @IsString()
  @IsOptional()
  picture_url?: string;
}