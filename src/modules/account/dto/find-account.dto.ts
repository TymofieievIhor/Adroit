import { ApiModelProperty } from '@nestjs/swagger';

export class FindAccountDto {
  @ApiModelProperty({ example: 'a', required: false })
  search: string;
}
