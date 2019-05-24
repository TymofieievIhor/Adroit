import { EntityBase } from '../../common/helpers/entity.base';
import { Client } from '../client/client.entity';
export declare class Contact extends EntityBase {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    phone_extension: string;
    title_or_relationship: string;
    client_id: number;
    passenger_id: number;
    deleted_by_account_id: number;
    client: Client;
}
