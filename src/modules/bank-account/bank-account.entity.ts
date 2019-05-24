import {Column, Entity} from 'typeorm';
import {Length} from 'class-validator';
import {EntityBase} from '../../common/helpers/entity.base';

@Entity({name: 'bank_account'})
export class BankAccount extends EntityBase {

    @Column({nullable: false})
    @Length(1, 256)
    owner_first_name: string;

    @Column({nullable: false})
    @Length(1, 256)
    owner_last_name: string;

    @Column('enum', {nullable: false, enum: ['checking', 'savings']})
    bank_account_type: string;

    @Column({nullable: false})
    @Length(1, 17)
    account_number: string;

    @Column({nullable: false})
    @Length(1, 17)
    routing_number: string;

    @Column()
    partner_id: number;

    @Column()
    driver_id: number;

    @Column()
    client_id: number;

}