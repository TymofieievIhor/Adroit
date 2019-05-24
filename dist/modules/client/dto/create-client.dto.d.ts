import { CreateClientSimpleDto } from './create-client-simple.dto';
import { CreateBankAccountDto } from '../../bank-account/dto/create-bank-account.dto';
import { CreateLocationDto } from '../../location/dto/create-location.dto';
import { CreateAccountDto } from '../../account/dto/create-account.dto';
import { CreateContactDto } from '../../contact/dto/create-contact.dto';
import { CreateClientAdminDto } from '../../client-admin/dto/create-client-admin.dto';
import { CreateServiceContractDto } from '../../service-contract/dto/create-service-contract.dto';
export declare class CreateClientDto {
    client: CreateClientSimpleDto;
    bank_account: CreateBankAccountDto;
    location: CreateLocationDto;
    owner_account: CreateAccountDto;
    contacts: CreateContactDto[];
    files: number[];
    admins: CreateClientAdminDto[];
    contracts: CreateServiceContractDto[];
    account_id?: number;
}
