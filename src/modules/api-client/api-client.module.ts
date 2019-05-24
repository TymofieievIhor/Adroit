import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ApiClient} from './api-client.entity';
import {ApiClientController} from './api-client.controller';
import {ApiClientService} from './api-client.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ApiClient]),
    ],
    providers: [
        ApiClientService,
    ],
    controllers: [
        ApiClientController,
    ],
    exports: [
        ApiClientService,
    ],
})
export class ApiClientModule {}
