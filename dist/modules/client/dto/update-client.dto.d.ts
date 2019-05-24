import { UpdateClientSimpleDto } from './update-client-simple.dto';
import { UpdateBankAccountDto } from '../../bank-account/dto/update-bank-account.dto';
import { UpdateLocationDto } from '../../location/dto/update-location.dto';
import { UpdateContactDto } from '../../contact/dto/update-contact.dto';
import { UpdateClientAdminDto } from '../../client-admin/dto/update-client-admin.dto';
import { UpdateServiceContractDto } from '../../service-contract/dto/update-service-contract.dto';
export declare class UpdateClientDto {
    client?: UpdateClientSimpleDto;
    bank_account?: UpdateBankAccountDto;
    location?: UpdateLocationDto;
    contacts?: UpdateContactDto[];
    files: number[];
    admins?: UpdateClientAdminDto[];
    contracts: UpdateServiceContractDto[];
    account_id?: number;
}
