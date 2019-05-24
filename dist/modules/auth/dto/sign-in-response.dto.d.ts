import { Account } from '../../account/account.entity';
export declare class SignInResponseDto {
    account_id: number;
    token: string;
    account?: Account;
}
