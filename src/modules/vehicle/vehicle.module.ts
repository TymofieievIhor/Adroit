import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleInsuranceModule } from '../vehicle-insurance/vehicle-insurance.module';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    VehicleInsuranceModule,
  ],
  providers: [VehicleService],
  controllers: [VehicleController],
  exports: [VehicleService],
})
export class VehicleModule {}
