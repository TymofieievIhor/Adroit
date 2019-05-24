import { CreateBankAccountDto } from '../../bank-account/dto/create-bank-account.dto';
import { SimpleDriverDto } from './simple-driver.dto';
import { CreateVehicleDto } from '../../vehicle/dto/create-vehicle.dto';
import { CreateDriverLicenseDto } from '../../driver-license/dto/create-driver-license.dto';
import { CreateAccountDto } from '../../account/dto/create-account.dto';
export declare class CreateDriverDto {
    bank_account: CreateBankAccountDto;
    driver: SimpleDriverDto;
    account: CreateAccountDto;
    driver_license: CreateDriverLicenseDto;
    vehicle: CreateVehicleDto;
    files?: number[];
    account_id?: number;
}
