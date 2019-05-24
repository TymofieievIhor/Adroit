import { IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreatePermissionAccessDto {
  @ApiModelProperty({example: 1})
  @IsNumber()
  account_type: number;

  @ApiModelProperty({example: 3})
  @IsNumber()
  api_client: number;

  @ApiModelProperty({example: false})
  @IsBoolean()
  is_deleted: boolean;
}