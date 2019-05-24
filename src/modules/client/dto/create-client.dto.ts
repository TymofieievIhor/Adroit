import { CreateClientSimpleDto } from './create-client-simple.dto';
import { CreateBankAccountDto } from '../../bank-account/dto/create-bank-account.dto';
import { CreateLocationDto } from '../../location/dto/create-location.dto';
import { CreateAccountDto } from '../../account/dto/create-account.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateContactDto } from '../../contact/dto/create-contact.dto';
import { CreateClientAdminDto } from '../../client-admin/dto/create-client-admin.dto';
import { CreateServiceContractDto } from '../../service-contract/dto/create-service-contract.dto';

export class CreateClientDto {
  @ApiModelProperty({required: true})
  client: CreateClientSimpleDto;

  @ApiModelProperty({required: true})
  bank_account: CreateBankAccountDto;

  @ApiModelProperty({required: true})
  location: CreateLocationDto;

  @ApiModelProperty({required: true})
  owner_account: CreateAccountDto;

  @ApiModelProperty()
  contacts: CreateContactDto[];

  @ApiModelProperty({example: [1]})
  files: number[];

  @ApiModelProperty({required: false})
  admins: CreateClientAdminDto[];

  @ApiModelProperty({required: true, type: CreateServiceContractDto, isArray: true})
  contracts: CreateServiceContractDto[];

  account_id?: number;
}