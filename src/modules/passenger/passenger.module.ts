import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './passenger.entity';
import { LocationModule } from '../location/location.module';
import { ContactModule } from '../contact/contact.module';
import { GuardianModule } from '../guardian/guardian.module';
import { UtilsModule } from '../../common/utils/utils.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Passenger]),
    LocationModule,
    ContactModule,
    GuardianModule,
    UtilsModule,
  ],
  controllers: [PassengerController],
  providers: [PassengerService],
  exports: [PassengerService],
})
export class PassengerModule {}
