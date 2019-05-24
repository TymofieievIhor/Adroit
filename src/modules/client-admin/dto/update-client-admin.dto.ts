import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateClientAdminDto {
  @ApiModelProperty({example: 'Accountant'})
  @IsString()
  @IsOptional()
  title?: string;

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

  client_id?: number;
}