import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SignIn} from './sign-in.entity';
import {SignInLogService} from './sign-in-log.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SignIn]),
    ],
    providers: [
        SignInLogService,
    ],
    exports: [
        SignInLogService,
    ],
})
export class SignInLogModule {}
