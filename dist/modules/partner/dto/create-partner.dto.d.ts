import { CreateLocationDto } from '../../location/dto/create-location.dto';
import { SimplePartnerDto } from './simple-partner.dto';
import { CreateAccountDto } from '../../account/dto/create-account.dto';
import { CreateBankAccountDto } from '../../bank-account/dto/create-bank-account.dto';
export declare class CreatePartnerDto {
    partner: SimplePartnerDto;
    location: CreateLocationDto;
    owner_account: CreateAccountDto;
    bank_account?: CreateBankAccountDto;
    files: number[];
    account_id?: number;
}
