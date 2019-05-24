import { ApiModelProperty } from '@nestjs/swagger';

export class FindPartnerDto {
  @ApiModelProperty({ example: 'a', required: false })
  search: string;
}
