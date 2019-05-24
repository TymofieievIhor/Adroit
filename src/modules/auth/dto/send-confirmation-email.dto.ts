import { ApiModelProperty } from '@nestjs/swagger';

export class SendConfirmationEmailDto {
  @ApiModelProperty({example: 1})
  id: number;

  @ApiModelProperty({example: 'localhost'})
  host: string;
}