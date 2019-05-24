import { EntityBase } from '../../common/helpers/entity.base';
import { Partner } from '../partner/partner.entity';
import { BankAccount } from '../bank-account/bank-account.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { DriverLicense } from '../driver-license/driver-license.entity';
import { Account } from '../account/account.entity';
import { File } from '../file/entities/file.entity';
export declare class Driver extends EntityBase {
    id: number;
    partner_id: number;
    account_id: number;
    ssn: number;
    gender: string;
    date_of_birth: string;
    driver_license_id: number;
    bank_account_id: number;
    has_serviced_trips: boolean;
    is_suspended: boolean;
    suspended_at: string;
    vehicles: Vehicle[];
    partner: Partner;
    bank_account: BankAccount;
    driver_license: DriverLicense;
    account: Account;
    files: File[];
}
