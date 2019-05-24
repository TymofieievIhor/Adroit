import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePassengerSimpleDto {
  @ApiModelProperty({example: 'Bob', required: true})
  @IsString()
  first_name: string;

  @ApiModelProperty({example: 'Nilson', required: true})
  @IsString()
  last_name: string;

  @ApiModelProperty({example: 'www.picture.com/myPic'})
  @IsString()
  picture_url: string;

  @ApiModelProperty({example: (new Date()).toISOString()})
  @IsString()
  date_of_birth: string;

  @ApiModelProperty({example: 1})
  @IsNumber()
  client_id: number;

  @ApiModelProperty({example: false})
  @IsBoolean()
  @IsOptional()
  needs_booster_seat?: boolean;

  @ApiModelProperty({example: false})
  @IsBoolean()
  @IsOptional()
  needs_car_seat?: boolean;

  @ApiModelProperty({example: false})
  @IsBoolean()
  @IsOptional()
  needs_safety_vest?: boolean;

  @ApiModelProperty({example: false})
  @IsBoolean()
  @IsOptional()
  needs_monitor?: boolean;

  @ApiModelProperty({example: false})
  @IsBoolean()
  @IsOptional()
  needs_wheelchair_assistance?: boolean;

  @ApiModelProperty({example: 'instruction'})
  @IsString()
  @IsOptional()
  instructions_note?: string;

  @ApiModelProperty({example: false})
  @IsBoolean()
  @IsOptional()
  has_been_on_trip?: boolean;
}