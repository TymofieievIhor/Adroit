import { CreateLocationDto } from '../../location/dto/create-location.dto';
import { SimpleDriverLicenseDto } from './simple-driver-license.dto';
export declare class CreateDriverLicenseDto {
    driver_license: SimpleDriverLicenseDto;
    location: CreateLocationDto;
}
