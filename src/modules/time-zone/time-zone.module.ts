import { Module } from '@nestjs/common';
import { TimeZoneController } from './time-zone.controller';
import { TimeZoneService } from './time-zone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeZone } from './time-zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeZone])],
  controllers: [TimeZoneController],
  providers: [TimeZoneService],
  exports: [TimeZoneService],
})
export class TimeZoneModule {}
