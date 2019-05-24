import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { VehicleModule } from '../vehicle/vehicle.module';
import { PartnerModule } from '../partner/partner.module';
import { DriverLicenseModule } from '../driver-license/driver-license.module';
import { AccountModule } from '../account/account.module';
import { FileModule } from '../file/file.module';
import { TripDailyChecklist } from './trip-daily-checklist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver]),
    TypeOrmModule.forFeature([TripDailyChecklist]),
    BankAccountModule,
    VehicleModule,
    PartnerModule,
    DriverLicenseModule,
    AccountModule,
    FileModule,
  ],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [
    DriverService,
  ],
})
export class DriverModule {}
