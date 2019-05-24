import { Column, Entity } from 'typeorm';
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

@Entity('client')
export class Client extends EntityBase {
  @Column({nullable: false})
  client_type_id: number;

  @Column({nullable: false})
  name: string;

  @Column()
  phone_number: string;

  @Column({nullable: true})
  phone_extension: string;

  @Column()
  bank_account_id: number;

  @Column()
  owner_account_id: number;

  @Column()
  location_id: number;

  @Column()
  is_archived: boolean;

  @Column('datetime')
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
    contract: ServiceContract,
    pricing: ServiceContractPricing,
  }[];
  ride_routes: RideRoute[];
}