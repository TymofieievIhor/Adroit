import {IsEmail, IsNumber, IsString} from 'class-validator';

export class SignInLogDto {
    @IsString()
    ip_address: string;

    @IsEmail()
    email: string;

    @IsString()
    phone_number: string;

    @IsNumber()
    account_id: number;

    @IsNumber()
    api_client_id: number;
}