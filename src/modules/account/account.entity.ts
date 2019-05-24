import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Length } from 'class-validator';
import { EntityBase } from '../../common/helpers/entity.base';
import { AccountType } from '../account-type/account-type.entity';

@Entity()
export class Account extends EntityBase {

    @Column({ nullable: false })
    @OneToOne((type) => AccountType)
    @JoinColumn({ name: 'id' })
    account_type_id: number;

    @Column({ nullable: false })
    @Length(1, 128)
    first_name: string;

    @Column({ nullable: false })
    @Length(1, 128)
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    phone_number: string;

    @Column({ nullable: false })
    @Length(1, 1024)
    password_hash: string;

    @Column({ nullable: false, default: true })
    is_temporary_password: boolean;

    @Column({ nullable: false })
    @Length(1, 1024)
    token_secret: string; // auth - token - client (apiClient obj), account (accId + type)

    @Column()
    firebase_token: string;

    @Column()
    picture_url: string;

    @Column({ nullable: false, default: false })
    is_email_confirmed: boolean;

    @Column('datetime')
    email_confirmed_at: string;

    @Column()
    @Length(1, 64)
    tos_acceptance_ip: string;

    @Column('datetime')
    tos_accepted_at: string;

    @Column({ nullable: false, default: false })
    is_beta_tester: boolean;

    @Column({ nullable: false, default: false })
    is_blocked: boolean;

    @Column('datetime')
    blocked_at: string;

    account_type: AccountType;
}
