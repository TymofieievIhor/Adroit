import { EntityBase } from '../../common/helpers/entity.base';
import { Contact } from '../contact/contact.entity';
import { Guardian } from '../guardian/guardian.entity';
import { LocationEntity } from '../location/location.entity';
import { Client } from '../client/client.entity';
import { LocationLink } from '../location/location-link.entity';
export declare class Passenger extends EntityBase {
    type: number;
    first_name: string;
    last_name: string;
    picture_url: string;
    date_of_birth: string;
    client_id: number;
    needs_booster_seat: boolean;
    needs_car_seat: boolean;
    needs_safety_vest: boolean;
    needs_monitor: boolean;
    needs_wheelchair_assistance: boolean;
    instructions_note: string;
    has_been_on_trip: boolean;
    is_archived: boolean;
    archived_at: string;
    client?: Client;
    passengerAddressLink: LocationLink[];
    locations?: LocationEntity[];
    guardians?: Guardian[];
    contacts?: Contact[];
}
