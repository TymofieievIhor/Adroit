import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFileDto {
  @ApiModelProperty({example: 'file1'})
  @IsString()
  name: string;

  @ApiModelProperty({example: 'https://example.com'})
  @IsString()
  cdn_url: string;

  partner_id?: number;

  driver_id?: number;

  client_id?: number;
}