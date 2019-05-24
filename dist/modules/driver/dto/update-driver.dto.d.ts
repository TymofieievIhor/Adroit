import { UpdateSimpleDriverDto } from './update-simple-driver.dto';
import { UpdateBankAccountDto } from '../../bank-account/dto/update-bank-account.dto';
import { UpdateDriverLicenseDto } from '../../driver-license/dto/update-driver-license.dto';
import { UpdateVehicleDto } from '../../vehicle/dto/update-vehicle.dto';
export declare class UpdateDriverDto {
    bank_account?: UpdateBankAccountDto;
    driver?: UpdateSimpleDriverDto;
    driver_license?: UpdateDriverLicenseDto;
    vehicle?: UpdateVehicleDto;
    files?: number[];
    account_id: number;
}
