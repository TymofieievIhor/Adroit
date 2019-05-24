import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateLocationDto {

    @ApiModelProperty({example: 123})
    @IsNumber()
    latitude: number;

    @ApiModelProperty({example: 32})
    @IsNumber()
    longitude: number;

    @ApiModelProperty({example: 'Sumska'})
    @IsString()
    street1: string;

    @ApiModelProperty({example: 'Pushkinska'})
    @IsString()
    @IsOptional()
    street2: string;

    @ApiModelProperty({example: 'Kyiv'})
    @IsString()
    city: string;

    @ApiModelProperty({example: 'CA'})
    @IsString()
    state: string;

    @ApiModelProperty({example: 32400})
    @IsNumber()
    zipcode: number;

    @ApiModelProperty({example: 'USA'})
    @IsString()
    country: string;

    @ApiModelProperty({example: 'home'})
    @IsString()
    @IsOptional()
    type?: string;
}