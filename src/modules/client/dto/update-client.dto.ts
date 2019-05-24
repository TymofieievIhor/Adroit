import { ApiModelProperty } from '@nestjs/swagger';
import { UpdateClientSimpleDto } from './update-client-simple.dto';
import { UpdateBankAccountDto } from '../../bank-account/dto/update-bank-account.dto';
import { UpdateLocationDto } from '../../location/dto/update-location.dto';
import { UpdateContactDto } from '../../contact/dto/update-contact.dto';
import { UpdateClientAdminDto } from '../../client-admin/dto/update-client-admin.dto';
import { UpdateServiceContractDto } from '../../service-contract/dto/update-service-contract.dto';

export class UpdateClientDto {
  @ApiModelProperty()
  client?: UpdateClientSimpleDto;

  @ApiModelProperty()
  bank_account?: UpdateBankAccountDto;

  @ApiModelProperty()
  location?: UpdateLocationDto;

  @ApiModelProperty()
  contacts?: UpdateContactDto[];

  @ApiModelProperty({example: [1]})
  files: number[];

  @ApiModelProperty()
  admins?: UpdateClientAdminDto[];

  @ApiModelProperty()
  contracts: UpdateServiceContractDto[];

  account_id?: number;
}