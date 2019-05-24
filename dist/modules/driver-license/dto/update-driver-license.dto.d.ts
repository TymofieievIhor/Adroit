import { UpdateLocationDto } from '../../location/dto/update-location.dto';
import { UpdateSimpleDriverLicenseDto } from './update-simple-driver-license.dto';
export declare class UpdateDriverLicenseDto {
    driver_license?: UpdateSimpleDriverLicenseDto;
    location?: UpdateLocationDto;
}
