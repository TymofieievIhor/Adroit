import { Account } from '../../account/account.entity';

export class SignInResponseDto {
  account_id: number;
  token: string;
  account?: Account;
}