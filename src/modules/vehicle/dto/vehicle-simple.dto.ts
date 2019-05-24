import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class VehicleSimpleDto {
  @ApiModelProperty({example: 'Nissan'})
  @IsString()
  make: string;

  @ApiModelProperty({example: 'Leaf'})
  @IsString()
  model: string;

  @ApiModelProperty({example: 'Sedan'})
  @IsString()
  type: string;

  @ApiModelProperty({example: 2018})
  @IsNumber()
  year: number;

  @ApiModelProperty({example: 'black'})
  @IsString()
  color: string;

  @ApiModelProperty({example: 'F43K435'})
  @IsString()
  license_plate: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  registration_expiry_date: string;

  @ApiModelProperty({example: 123234345})
  @IsNumber()
  vin: number;

  @ApiModelProperty({example: './example.jpg'})
  @IsString()
  @IsOptional()
  picture_url?: string;
}