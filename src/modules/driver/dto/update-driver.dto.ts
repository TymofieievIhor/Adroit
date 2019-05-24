import { ApiModelProperty } from '@nestjs/swagger';
import { UpdateSimpleDriverDto } from './update-simple-driver.dto';
import { UpdateBankAccountDto } from '../../bank-account/dto/update-bank-account.dto';
import { UpdateDriverLicenseDto } from '../../driver-license/dto/update-driver-license.dto';
import { UpdateVehicleDto } from '../../vehicle/dto/update-vehicle.dto';

export class UpdateDriverDto {
  @ApiModelProperty()
  bank_account?: UpdateBankAccountDto;

  @ApiModelProperty()
  driver?: UpdateSimpleDriverDto;

  @ApiModelProperty()
  driver_license?: UpdateDriverLicenseDto;

  @ApiModelProperty()
  vehicle?: UpdateVehicleDto;

  @ApiModelProperty({example: [1], required: false})
  files?: number[];

  account_id: number;
}