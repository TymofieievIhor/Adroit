import {IsNumber, IsOptional, IsString} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateLocationDto {

    @ApiModelProperty({example: 12})
    @IsNumber()
    @IsOptional()
    latitude?: number;

    @ApiModelProperty({example: 22})
    @IsNumber()
    @IsOptional()
    longitude?: number;

    @ApiModelProperty({example: 'Bank Ave'})
    @IsString()
    @IsOptional()
    street1?: string;

    @ApiModelProperty({example: 'Bank Ave 2'})
    @IsString()
    @IsOptional()
    street2?: string;

    @ApiModelProperty({example: 'New York'})
    @IsString()
    @IsOptional()
    city?: string;

    @ApiModelProperty({example: 'NY'})
    @IsString()
    @IsOptional()
    state?: string;

    @ApiModelProperty({example: 1231})
    @IsNumber()
    @IsOptional()
    zipcode?: number;

    @ApiModelProperty({example: 'USA'})
    @IsString()
    @IsOptional()
    country?: string;

    id?: number;
}