import { Module } from '@nestjs/common';
import { RideManagementController } from './ride-management.controller';
import { RideManagementService } from './ride-management.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RideRoute } from './entities/ride-route.entity';
import { LocationModule } from '../location/location.module';
import { RideBlueprintAssignment } from './entities/ride-blueprint-assignment.entity';
import { RideBlueprint } from './entities/ride-blueprint.entity';
import { RideChangeRequest } from './entities/ride-change-request.entity';
import { TripModule } from '../trip/trip.module';
import { RideDriverPayoutAdjustment } from "./entities/ride-driver-payout-adjustment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([RideRoute, RideBlueprintAssignment, RideBlueprint, RideChangeRequest, RideDriverPayoutAdjustment]),
    LocationModule,
    TripModule,
  ],
  controllers: [RideManagementController],
  providers: [RideManagementService],
  exports: [RideManagementService],
})
export class RideManagementModule {}
