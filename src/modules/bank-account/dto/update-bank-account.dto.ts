import {IsOptional, IsString} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateBankAccountDto {
    @ApiModelProperty({example: 'Lara'})
    @IsString()
    @IsOptional()
    owner_first_name?: string;

    @ApiModelProperty({example: 'Croft'})
    @IsString()
    @IsOptional()
    owner_last_name?: string;

    @ApiModelProperty({example: 'checking'})
    @IsString()
    @IsOptional()
    bank_account_type?: string;

    @ApiModelProperty({example: 111222333})
    @IsString()
    @IsOptional()
    account_number?: string;

    @ApiModelProperty({example: 123123123})
    @IsString()
    @IsOptional()
    routing_number?: string;

    partner_id?: number;

    driver_id?: number;
}