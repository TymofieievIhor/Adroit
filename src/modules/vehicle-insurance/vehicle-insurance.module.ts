import { Module } from '@nestjs/common';
import { VehicleInsuranceService } from './vehicle-insurance.service';
import { VehicleInsuranceController } from './vehicle-insurance.controller';
import { VehicleInsurance } from './vehicle-insurance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleInsurance]),
  ],
  providers: [VehicleInsuranceService],
  controllers: [VehicleInsuranceController],
  exports: [
    VehicleInsuranceService,
  ],
})
export class VehicleInsuranceModule {}
