import { EntityBase } from '../../common/helpers/entity.base';
import { BankAccount } from '../bank-account/bank-account.entity';
import { LocationEntity } from '../location/location.entity';
import { ClientType } from '../client-type/client-type.entity';
import { Account } from '../account/account.entity';
import { Contact } from '../contact/contact.entity';
import { File } from '../file/entities/file.entity';
import { Passenger } from '../passenger/passenger.entity';
import { ClientAdmin } from '../client-admin/client-admin.entity';
import { ServiceContract } from '../service-contract/entities/service-contract.entity';
import { ServiceContractPricing } from '../service-contract/entities/service-contract-pricing.entity';
import { RideRoute } from '../ride-management/entities/ride-route.entity';
export declare class Client extends EntityBase {
    client_type_id: number;
    name: string;
    phone_number: string;
    phone_extension: string;
    bank_account_id: number;
    owner_account_id: number;
    location_id: number;
    is_archived: boolean;
    archived_at: string;
    bank_account: BankAccount;
    owner_account: Account;
    client_type: ClientType;
    location: LocationEntity;
    contacts: Contact[];
    files: File[];
    passengers: Passenger[];
    admins: ClientAdmin[];
    contracts: ServiceContract[];
    contractsWithPricing: {
        contract: ServiceContract;
        pricing: ServiceContractPricing;
    }[];
    ride_routes: RideRoute[];
}
