import { EntityBase } from '../../common/helpers/entity.base';
export declare class BankAccount extends EntityBase {
    owner_first_name: string;
    owner_last_name: string;
    bank_account_type: string;
    account_number: string;
    routing_number: string;
    partner_id: number;
    driver_id: number;
    client_id: number;
}
