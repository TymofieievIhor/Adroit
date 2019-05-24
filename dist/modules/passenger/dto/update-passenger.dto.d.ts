import { UpdatePassengerSimpleDto } from './update-passenger-simple.dto';
import { UpdateLocationDto } from '../../location/dto/update-location.dto';
import { UpdateContactDto } from '../../contact/dto/update-contact.dto';
import { UpdateGuardianDto } from '../../guardian/dto/update-guardian.dto';
export declare class UpdatePassengerDto {
    passenger?: UpdatePassengerSimpleDto;
    locations?: UpdateLocationDto[];
    guardians?: UpdateGuardianDto[];
    contacts?: UpdateContactDto[];
    account_id?: number;
}
