import { Module } from '@nestjs/common';
import { DriverLicenseService } from './driver-license.service';
import { DriverLicenseController } from './driver-license.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverLicense } from './driver-license.entity';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DriverLicense]),
    LocationModule,
  ],
  providers: [DriverLicenseService],
  controllers: [DriverLicenseController],
  exports: [DriverLicenseService],
})
export class DriverLicenseModule {}
