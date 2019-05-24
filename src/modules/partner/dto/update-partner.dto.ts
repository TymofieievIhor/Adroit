import {IsOptional} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import { UpdateLocationDto } from '../../location/dto/update-location.dto';
import { UpdateBankAccountDto } from '../../bank-account/dto/update-bank-account.dto';
import { UpdateSimplePartnerDto } from './update-simple-partner.dto';

export class UpdatePartnerDto {
    @ApiModelProperty()
    @IsOptional()
    partner: UpdateSimplePartnerDto;

    @ApiModelProperty()
    @IsOptional()
    location?: UpdateLocationDto;

    @ApiModelProperty()
    @IsOptional()
    bank_account?: UpdateBankAccountDto;

    @ApiModelProperty({example: [1], required: false})
    files: number[];

    account_id?: number;
}