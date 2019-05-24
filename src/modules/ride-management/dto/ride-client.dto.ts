import { ApiModelProperty } from '@nestjs/swagger';

export class RideClientDto {
  @ApiModelProperty({example: 1})
  id?: number;

  @ApiModelProperty({example: 1})
  client_id: number;

  @ApiModelProperty({example: 100})
  invoice_responsibility_percentage: number;
}