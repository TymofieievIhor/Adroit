import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAccountDto {

    account_type_id?: number;

    @ApiModelProperty({ example: 'Trevor' })
    @IsString()
    first_name: string;

    @ApiModelProperty({ example: 'Noah' })
    @IsString()
    last_name: string;

    @ApiModelProperty({ example: 'email@domain.com' })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiModelProperty({ example: '9999999999' })
    @IsString()
    @IsOptional()
    phone_number?: string;

    @ApiModelProperty({ example: 'https://cdn.goadroit.com/example.jpg' })
    @IsString()
    @IsOptional()
    picture_url?: string;

    @ApiModelProperty({ example: false })
    @IsBoolean()
    @IsOptional()
    is_beta_tester?: boolean;
}
