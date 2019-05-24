import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { TripDriver } from './entities/trip-driver.entity';
import { TripOrchestratorController } from './trip-orchestrator.controller';
import { TripOrchestratorService } from './trip-orchestrator.service';
import { TripService } from './trip.service';
import { LocationModule } from '../location/location.module';
import { TripMutatorService } from './trip-mutator.service';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, TripDriver]), LocationModule, AccountModule],
  providers: [TripOrchestratorService, TripService, TripMutatorService],
  controllers: [TripController, TripOrchestratorController],
  exports: [TripOrchestratorService, TripService, TripMutatorService],
})
export class TripModule {}
