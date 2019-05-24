import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BankAccount} from './bank-account.entity';
import {BankAccountService} from './bank-account.service';
import {BankAccountController} from './bank-account.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([BankAccount]),
    ],
    providers: [
        BankAccountService,
    ],
    controllers: [
        BankAccountController,
    ],
    exports: [
        BankAccountService,
    ],
})
export class BankAccountModule {}
