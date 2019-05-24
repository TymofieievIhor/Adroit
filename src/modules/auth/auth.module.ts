import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as passport from 'passport';
import {JwtStrategy} from './jwt.strategy';
import {AccountModule} from '../account/account.module';
import {ApiClientModule} from '../api-client/api-client.module';
import {SignInLogModule} from '../sign-in-log/sign-in-log.module';
import {AccountTypeModule} from '../account-type/account-type.module';
import { PermissionAccessModule } from '../permission-access/permission-access.module';
import { DriverModule } from '../driver/driver.module';

@Module({
    imports: [
        AccountModule,
        ApiClientModule,
        SignInLogModule,
        AccountTypeModule,
        PermissionAccessModule,
        DriverModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [
        AuthService,
    ],
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes(
                {path: '/private/*', method: RequestMethod.ALL},
            );
    }
}
