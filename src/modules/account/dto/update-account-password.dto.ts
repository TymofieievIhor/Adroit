import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateAccountPasswordDto {
  @ApiModelProperty({ example: '12345678', required: true })
  old_password: string;

  @ApiModelProperty({ example: '87654321', required: true })
  new_password: string;
}
