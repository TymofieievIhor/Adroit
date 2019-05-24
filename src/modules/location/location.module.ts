import { Module } from '@nestjs/common';
import {LocationEntity} from './location.entity';
import {LocationService} from './location.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LocationController} from './location.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([LocationEntity]),
    ],
    providers: [
        LocationService,
    ],
    controllers: [
        LocationController,
    ],
    exports: [
        LocationService,
    ],
})
export class LocationModule {}
