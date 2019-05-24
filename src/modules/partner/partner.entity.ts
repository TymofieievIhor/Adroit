import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';
import {Length} from 'class-validator';
import {EntityBase} from '../../common/helpers/entity.base';
import {Account} from '../account/account.entity';
import {LocationEntity} from '../location/location.entity';
import {BankAccount} from '../bank-account/bank-account.entity';
import { File } from '../file/entities/file.entity';
import { Driver } from '../driver/driver.entity';

@Entity()
export class Partner extends EntityBase {

    @Column({nullable: false})
    @OneToOne((type) => Account)
    @JoinColumn({name: 'id'})
    owner_account_id: number;

    @Column({nullable: false})
    @Length(1, 512)
    name: string;

    @Column({nullable: false, unique: true})
    tin: number;

    @Column({nullable: false})
    @OneToOne((type) => LocationEntity)
    @JoinColumn({name: 'id'})
    location_id: number;

    @Column()
    bank_account_id?: number;

    @Column({nullable: false, default: false})
    is_archived: boolean;

    @Column('datetime')
    archived_at: string;

    owner_account: Account;

    location: LocationEntity;

    bank_account: BankAccount;

    files: File[];

    drivers: Driver[];
}