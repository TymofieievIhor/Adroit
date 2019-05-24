import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdatePassengerSimpleDto {
  @ApiModelProperty({example: 'Bob'})
  @IsString()
  @IsOptional()
  first_name?: string;

  @ApiModelProperty({example: 'Nilson'})
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiModelProperty({example: 'www.picture.com/myPic'})
  @IsString()
  @IsOptional()
  picture_url?: string;

  @ApiModelProperty({example: 'instruction'})
  @IsString()
  @IsOptional()
  instructions_note?: string;
}