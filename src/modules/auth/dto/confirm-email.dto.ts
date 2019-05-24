import { ApiModelProperty } from '@nestjs/swagger';

export class ConfirmEmailDto {
  @ApiModelProperty({example: 'token'})
  token: string;

  @ApiModelProperty({example: 1})
  api_client_id: string;
}