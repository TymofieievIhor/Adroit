import {ApiModelProperty} from '@nestjs/swagger';
import {IsOptional, IsString} from 'class-validator';

export class SignInDto {
    @ApiModelProperty({example: 'admin@example.com'})
    @IsString()
    login: string;

    @ApiModelProperty({example: 'ChangeMe!'})
    @IsString()
    password: string;

    @ApiModelProperty({example: 1})
    @IsOptional()
    api_client_id: number;

    @ApiModelProperty({example: 'firebase_token'})
    @IsString()
    @IsOptional()
    firebase_token?: string;
}