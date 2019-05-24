import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AccountTypeService} from './account-type.service';
import {AccountTypeController} from './account-type.controller';
import {AccountType} from './account-type.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([AccountType]),
    ],
    providers: [
        AccountTypeService,
    ],
    controllers: [
        AccountTypeController,
    ],
    exports: [
        AccountTypeService,
    ],
})
export class AccountTypeModule {}
