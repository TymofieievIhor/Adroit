import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateAccountDto {
    @ApiModelProperty({ example: 'Alex' })
    @IsString()
    @IsOptional()
    first_name?: string;

    @ApiModelProperty({ example: 'Green' })
    @IsString()
    @IsOptional()
    last_name?: string;

    @ApiModelProperty({ example: 'alexgreen@example.com' })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiModelProperty({ example: '+7538423' })
    @IsString()
    @IsOptional()
    phone_number?: string;

    @ApiModelProperty({ example: 'newPass123' })
    @IsString()
    @IsOptional()
    password?: string;

    @ApiModelProperty({ example: 'picture.com' })
    @IsString()
    @IsOptional()
    picture_url?: string;

    @ApiModelProperty({ example: '12345' })
    @IsString()
    @IsOptional()
    firebase_token?: string;

    @ApiModelProperty({ example: false })
    @IsBoolean()
    @IsOptional()
    is_beta_tester?: boolean;

    is_email_confirmed?: boolean;
    email_confirmed_at?: string;
}
