import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Length} from 'class-validator';

@Entity({name: 'sign_in'})
export class SignIn {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 64)
    ip_address: string;

    @Column({nullable: false})
    email: string;

    @Column()
    phone_number: string;

    @Column({nullable: false, default: true})
    is_success: boolean;

    @Column()
    account_id: number;

    @Column()
    api_client_id: number;

    @Column('datetime', {nullable: false, default: new Date()})
    created_at: string = (new Date()).toISOString();
}