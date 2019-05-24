import {IsString} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBankAccountDto {
    @ApiModelProperty({example: 'John'})
    @IsString()
    owner_first_name: string;

    @ApiModelProperty({example: 'Doe'})
    @IsString()
    owner_last_name: string;

    @ApiModelProperty({example: 'checking'})
    @IsString()
    bank_account_type: string;

    @ApiModelProperty({example: '478374699811'})
    @IsString()
    account_number: string;

    @ApiModelProperty({example: '4873627463333'})
    @IsString()
    routing_number: string;

    partner_id?: number;

    driver_id?: number;
}