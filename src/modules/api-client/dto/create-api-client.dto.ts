import {IsNumber, IsString} from 'class-validator';

export class CreateApiClientDto {
    @IsNumber()
    value: number;

    @IsString()
    text_value: string;

    @IsString()
    name: string;
}