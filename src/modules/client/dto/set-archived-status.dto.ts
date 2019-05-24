import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class SetArchivedStatusDto {
  @ApiModelProperty({example: true})
  @IsBoolean()
  archive: boolean;
}