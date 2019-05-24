import { IsNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SimplePartnerDto {
    @ApiModelProperty({example: 'partner1'})
    @IsString()
    name: string;

    @ApiModelProperty({example: 2341233})
    @IsNumber()
    tin: number;
}