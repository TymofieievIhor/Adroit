import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class BasicPaginationDto {
  @ApiModelProperty({ example: 0, required: false })
  @IsNumberString()
  @IsOptional()
  page?: number;

  @ApiModelProperty({ example: 10, required: false })
  @IsNumberString()
  @IsOptional()
  size?: number;

  @ApiModelProperty({ example: 'id, asc', required: false })
  @IsString()
  @IsOptional()
  sort?: string;
}
