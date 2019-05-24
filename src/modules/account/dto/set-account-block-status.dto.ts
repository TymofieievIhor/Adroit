import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class SetAccountBlockStatusDto {
  @ApiModelProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  block?: boolean;
}
