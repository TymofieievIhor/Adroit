import {IsBoolean, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateLocationTypeDto {
    @IsNumber()
    value: number;

    @IsString()
    text_value: string;

    @IsString()
    name: string;

    @IsBoolean()
    @IsOptional()
    display_in_user_interface?: boolean;
}