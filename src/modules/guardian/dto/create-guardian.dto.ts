import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateGuardianDto {
  @ApiModelProperty({example: 'Alex'})
  @IsString()
  first_name: string;

  @ApiModelProperty({example: 'Green'})
  @IsString()
  last_name: string;

  @ApiModelProperty({example: 'alexgreen@gmail.com'})
  @IsString()
  @IsOptional()
  email?: string;

  @ApiModelProperty({example: '+12839421'})
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiModelProperty({example: 'Mother'})
  @IsString()
  @IsOptional()
  relationship?: string;

  passenger_id?: number;
}