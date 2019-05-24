import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {ApiClient} from './api-client.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {ServiceBase} from '../../common/helpers/service.base';

@Injectable()
export class ApiClientService extends ServiceBase<ApiClient>{
    constructor(@InjectRepository(ApiClient) protected readonly repository: Repository<ApiClient>) {
        super(ApiClient, repository);
    }

}