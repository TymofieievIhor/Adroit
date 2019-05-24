import { UpdateLocationDto } from '../../location/dto/update-location.dto';
import { UpdateBankAccountDto } from '../../bank-account/dto/update-bank-account.dto';
import { UpdateSimplePartnerDto } from './update-simple-partner.dto';
export declare class UpdatePartnerDto {
    partner: UpdateSimplePartnerDto;
    location?: UpdateLocationDto;
    bank_account?: UpdateBankAccountDto;
    files: number[];
    account_id?: number;
}
