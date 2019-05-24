import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateContactDto {
  @ApiModelProperty({example: 'Ben'})
  @IsString()
  @IsOptional()
  first_name?: string;

  @ApiModelProperty({example: 'Fox'})
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiModelProperty({example: 'benfox@gmail.com'})
  @IsString()
  @IsOptional()
  email?: string;

  @ApiModelProperty({example: '+74839421'})
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiModelProperty({example: '123'})
  @IsOptional()
  phone_extension?: string;

  @ApiModelProperty({example: 'Accountant'})
  @IsString()
  @IsOptional()
  title_or_relationship?: string;

  @ApiModelProperty({example: 1})
  @IsNumber()
  @IsOptional()
  id?: number;

  client_id?: string;

  passenger_id?: string;
}