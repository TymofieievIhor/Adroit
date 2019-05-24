import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Partner} from './partner.entity';
import {PartnerService} from './partner.service';
import {PartnerController} from './partner.controller';
import { LocationModule } from '../location/location.module';
import { AccountModule } from '../account/account.module';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { FileModule } from '../file/file.module';
import { UtilsModule } from '../../common/utils/utils.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Partner]),
        LocationModule,
        AccountModule,
        BankAccountModule,
        FileModule,
        UtilsModule,
    ],
    providers: [
        PartnerService,
    ],
    controllers: [
        PartnerController,
    ],
    exports: [
        PartnerService,
    ],
})
export class PartnerModule {}
