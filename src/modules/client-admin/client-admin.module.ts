import { Module } from '@nestjs/common';
import { ClientAdminService } from './client-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientAdmin } from './client-admin.entity';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientAdmin]),
    AccountModule,
  ],
  providers: [ClientAdminService],
  exports: [ClientAdminService],
})
export class ClientAdminModule {}
