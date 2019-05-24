import { ApiModelProperty } from '@nestjs/swagger';
import { CreateBankAccountDto } from '../../bank-account/dto/create-bank-account.dto';
import { SimpleDriverDto } from './simple-driver.dto';
import { CreateVehicleDto } from '../../vehicle/dto/create-vehicle.dto';
import { CreateDriverLicenseDto } from '../../driver-license/dto/create-driver-license.dto';
import { CreateAccountDto } from '../../account/dto/create-account.dto';

export class CreateDriverDto {
  @ApiModelProperty({required: true})
  bank_account: CreateBankAccountDto;

  @ApiModelProperty({required: true})
  driver: SimpleDriverDto;

  @ApiModelProperty({required: true})
  account: CreateAccountDto;

  @ApiModelProperty({required: true})
  driver_license: CreateDriverLicenseDto;

  @ApiModelProperty({required: true})
  vehicle: CreateVehicleDto;

  @ApiModelProperty({example: [1], required: false})
  files?: number[];

  account_id?: number;
}