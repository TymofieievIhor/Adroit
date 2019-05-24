import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClientSimpleDto {
  @ApiModelProperty({example: 'client1'})
  @IsString()
  name: string;

  @ApiModelProperty({example: '+74564563'})
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiModelProperty({example: '123'})
  @IsOptional()
  phone_extension?: string;

  @ApiModelProperty({example: 1})
  @IsNumber()
  client_type_id: number;
}