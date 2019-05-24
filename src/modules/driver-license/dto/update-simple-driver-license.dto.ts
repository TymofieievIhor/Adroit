import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSimpleDriverLicenseDto {
  @ApiModelProperty({example: 'KL1231'})
  @IsString()
  @IsOptional()
  number?: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  @IsOptional()
  date_of_expiration?: string;

  @ApiModelProperty({example: 'NY'})
  @IsString()
  @IsOptional()
  issued_by_state?: string;

  @ApiModelProperty({example: 100})
  @IsNumber()
  @IsOptional()
  weight_in_pounds?: number;

  @ApiModelProperty({example: 100})
  @IsNumber()
  @IsOptional()
  height_in_feet?: number;

  @ApiModelProperty({example: 100})
  @IsNumber()
  @IsOptional()
  height_in_inches?: number;

  @ApiModelProperty({example: 'black'})
  @IsString()
  @IsOptional()
  hair_color?: string;

  @ApiModelProperty({example: 'brown'})
  @IsString()
  @IsOptional()
  eye_color?: string;
}