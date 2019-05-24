import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { LocationModule } from '../location/location.module';
import { PlaceService } from './place.service';
import { UtilsModule } from '../../common/utils/utils.module';
import { TimeZoneModule } from '../time-zone/time-zone.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    LocationModule,
    UtilsModule,
    TimeZoneModule,
  ],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [PlaceService],
})
export class PlaceModule {}
