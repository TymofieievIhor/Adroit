import { ApiModelProperty } from '@nestjs/swagger';
import { CreateLocationDto } from '../../location/dto/create-location.dto';
import { SimplePartnerDto } from './simple-partner.dto';
import { CreateAccountDto } from '../../account/dto/create-account.dto';
import { CreateBankAccountDto } from '../../bank-account/dto/create-bank-account.dto';

export class CreatePartnerDto {
    @ApiModelProperty({required: true})
    partner: SimplePartnerDto;

    @ApiModelProperty({required: true})
    location: CreateLocationDto;

    @ApiModelProperty({required: true})
    owner_account: CreateAccountDto;

    @ApiModelProperty({required: true})
    bank_account?: CreateBankAccountDto;

    @ApiModelProperty({example: [1], required: false})
    files: number[];

    account_id?: number;
}