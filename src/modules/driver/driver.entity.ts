import { EntityBase } from '../../common/helpers/entity.base';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Partner } from '../partner/partner.entity';
import { BankAccount } from '../bank-account/bank-account.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { DriverLicense } from '../driver-license/driver-license.entity';
import { Account } from '../account/account.entity';
import { File } from '../file/entities/file.entity';

@Entity()
export class Driver extends EntityBase {
  @Column({nullable: false})
  id: number;

  @Column({nullable: false})
  partner_id: number;

  @Column({nullable: false})
  account_id: number;

  @Column({nullable: false, unique: true})
  ssn: number;

  @Column({nullable: false})
  gender: string;

  @Column('date', {nullable: false})
  date_of_birth: string;

  @Column()
  driver_license_id: number;

  @Column({nullable: false})
  bank_account_id: number;

  @Column({nullable: false})
  has_serviced_trips: boolean = false;

  @Column({nullable: false})
  is_suspended: boolean = false;

  @Column('datetime')
  suspended_at: string;

  vehicles: Vehicle[];

  @OneToOne(type => Partner)
  @JoinColumn({name: 'partner_id'})
  partner: Partner;

  @OneToOne(type => BankAccount)
  @JoinColumn({name: 'id'})
  bank_account: BankAccount;

  @OneToOne(type => DriverLicense)
  @JoinColumn({name: 'id'})
  driver_license: DriverLicense;

  @OneToOne(type => Account)
  @JoinColumn({name: 'id'})
  account: Account;

  files: File[];
}