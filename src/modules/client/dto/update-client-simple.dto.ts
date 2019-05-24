import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateClientSimpleDto {
  @ApiModelProperty({example: 'client1'})
  @IsString()
  @IsOptional()
  name?: string;

  @ApiModelProperty({example: '+74564563'})
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiModelProperty({example: '123'})
  @IsOptional()
  phone_extension?: string;

  @ApiModelProperty({example: 1})
  @IsNumber()
  @IsOptional()
  client_type_id?: number;
}