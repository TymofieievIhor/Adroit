import { CreateLocationDto } from '../../location/dto/create-location.dto';
import { CreatePassengerSimpleDto } from './create-passenger-simple.dto';
import { CreateContactDto } from '../../contact/dto/create-contact.dto';
import { CreateGuardianDto } from '../../guardian/dto/create-guardian.dto';
export declare class CreatePassengerDto {
    passenger: CreatePassengerSimpleDto;
    locations: CreateLocationDto[];
    guardians?: CreateGuardianDto[];
    contacts?: CreateContactDto[];
}
