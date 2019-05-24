import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateFileDto {
  @ApiModelProperty({example: 'file2'})
  @IsString()
  @IsOptional()
  name?: string;

  @ApiModelProperty({example: 'https://example.com'})
  @IsString()
  @IsOptional()
  cdn_url?: string;
}