import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiModelProperty({example: 'Ben'})
  @IsString()
  first_name: string;

  @ApiModelProperty({example: 'Fox'})
  @IsString()
  last_name: string;

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

  client_id?: string;

  passenger_id?: string;
}