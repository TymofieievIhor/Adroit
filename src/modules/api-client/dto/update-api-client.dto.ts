import {IsNumber, IsOptional, IsString} from 'class-validator';

export class UpdateApiClientDto {
    @IsNumber()
    @IsOptional()
    value?: number;

    @IsString()
    @IsOptional()
    text_value?: string;

    @IsString()
    @IsOptional()
    name?: string;
}