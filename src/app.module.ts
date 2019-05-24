import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccountModule } from './modules/account/account.module';
import { AccountTypeModule } from './modules/account-type/account-type.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ApiClientModule } from './modules/api-client/api-client.module';
import { SignInLogModule } from './modules/sign-in-log/sign-in-log.module';
import { PartnerModule } from './modules/partner/partner.module';
import { LocationModule } from './modules/location/location.module';
import { LocationTypeModule } from './modules/location-type/location-type.module';
import { BankAccountModule } from './modules/bank-account/bank-account.module';
import { AuthModule } from './modules/auth/auth.module';
import {TypedEnv} from './common/env/constant';
import { DriverModule } from './modules/driver/driver.module';
import { DriverLicenseModule } from './modules/driver-license/driver-license.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { VehicleInsuranceModule } from './modules/vehicle-insurance/vehicle-insurance.module';
import { FileModule } from './modules/file/file.module';
import { ClientModule } from './modules/client/client.module';
import { ClientTypeModule } from './modules/client-type/client-type.module';
import { ContactModule } from './modules/contact/contact.module';
import { TripModule } from './modules/trip/trip.module';
import { PlaceModule } from './modules/place/place.module';
import { PassengerModule } from './modules/passenger/passenger.module';
import { UtilsModule } from './common/utils/utils.module';
import { TimeZoneModule } from './modules/time-zone/time-zone.module';
import { ClientAdminModule } from './modules/client-admin/client-admin.module';
import { ServiceContractModule } from './modules/service-contract/service-contract.module';
import { RideManagementModule } from './modules/ride-management/ride-management.module';
import {PermissionAccessModule} from './modules/permission-access/permission-access.module';
@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          port: 3306,
          host: TypedEnv.DB_HOST,
          username: TypedEnv.DB_USERNAME,
          password: TypedEnv.DB_PASSWORD,
          database: TypedEnv.DB_NAME,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          timezone: 'Z',
          supportBigNumbers: true,
          bigNumberStrings: false,
      }),
    AccountModule,
    AccountTypeModule,
    ApiClientModule,
    SignInLogModule,
    PartnerModule,
    LocationModule,
    LocationTypeModule,
    BankAccountModule,
    AuthModule,
    DriverModule,
    DriverLicenseModule,
    VehicleModule,
    VehicleInsuranceModule,
    FileModule,
    ClientModule,
    ClientTypeModule,
    ContactModule,
    TripModule,
    PlaceModule,
    PassengerModule,
    UtilsModule,
    TimeZoneModule,
    ClientAdminModule,
    ServiceContractModule,
    RideManagementModule,
    TripModule,
    PermissionAccessModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
