import { EntityBase } from '../../common/helpers/entity.base';
import { Account } from '../account/account.entity';
import { LocationEntity } from '../location/location.entity';
import { BankAccount } from '../bank-account/bank-account.entity';
import { File } from '../file/entities/file.entity';
import { Driver } from '../driver/driver.entity';
export declare class Partner extends EntityBase {
    owner_account_id: number;
    name: string;
    tin: number;
    location_id: number;
    bank_account_id?: number;
    is_archived: boolean;
    archived_at: string;
    owner_account: Account;
    location: LocationEntity;
    bank_account: BankAccount;
    files: File[];
    drivers: Driver[];
}
