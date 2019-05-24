import {IsBoolean, IsNumber, IsOptional, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class UpdateAccountTypeDto {
    @ApiModelProperty({example: 22})
    @IsNumber()
    @IsOptional()
    value?: number;

    @ApiModelProperty({example: 'admin'})
    @IsString()
    @IsOptional()
    text_value?: string;

    @ApiModelProperty({example: 'Admin'})
    @IsString()
    @IsOptional()
    name?: string;

    @ApiModelProperty({example: true})
    @IsBoolean()
    @IsOptional()
    display_in_user_interface?: boolean;
}