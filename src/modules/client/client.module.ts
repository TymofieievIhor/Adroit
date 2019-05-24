import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientTypeModule } from '../client-type/client-type.module';
import { LocationModule } from '../location/location.module';
import { AccountModule } from '../account/account.module';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { ContactModule } from '../contact/contact.module';
import { FileModule } from '../file/file.module';
import { UtilsModule } from '../../common/utils/utils.module';
import { ClientAdminModule } from '../client-admin/client-admin.module';
import { ServiceContractModule } from '../service-contract/service-contract.module';
import { PassengerModule } from '../passenger/passenger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    ClientTypeModule,
    LocationModule,
    AccountModule,
    BankAccountModule,
    ContactModule,
    FileModule,
    UtilsModule,
    ClientAdminModule,
    ServiceContractModule,
    PassengerModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService]
})
export class ClientModule {}
