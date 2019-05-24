import {IsBoolean, IsNumber, IsOptional, IsString} from 'class-validator';

export class UpdateLocationTypeDto {
    @IsNumber()
    @IsOptional()
    value?: number;

    @IsString()
    @IsOptional()
    text_value?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsBoolean()
    @IsOptional()
    display_in_user_interface?: boolean;
}