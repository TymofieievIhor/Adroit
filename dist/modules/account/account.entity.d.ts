import { EntityBase } from '../../common/helpers/entity.base';
import { AccountType } from '../account-type/account-type.entity';
export declare class Account extends EntityBase {
    account_type_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password_hash: string;
    is_temporary_password: boolean;
    token_secret: string;
    firebase_token: string;
    picture_url: string;
    is_email_confirmed: boolean;
    email_confirmed_at: string;
    tos_acceptance_ip: string;
    tos_accepted_at: string;
    is_beta_tester: boolean;
    is_blocked: boolean;
    blocked_at: string;
    account_type: AccountType;
}
