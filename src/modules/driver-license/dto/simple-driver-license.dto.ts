import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SimpleDriverLicenseDto {
  @ApiModelProperty({example: 'KL2311'})
  @IsString()
  number: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  date_of_expiration: string;

  @ApiModelProperty({example: 'NY'})
  @IsString()
  issued_by_state: string;

  @ApiModelProperty({example: 100})
  @IsNumber()
  weight_in_pounds: number;

  @ApiModelProperty({example: 100})
  @IsNumber()
  height_in_feet: number;

  @ApiModelProperty({example: 100})
  @IsNumber()
  height_in_inches: number;

  @ApiModelProperty({example: 'black'})
  @IsString()
  hair_color: string;

  @ApiModelProperty({example: 'brown'})
  @IsString()
  eye_color: string;
}