import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { ClientType } from './client-type.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientTypeService extends ServiceBase<ClientType> {
  constructor(@InjectRepository(ClientType) protected readonly repository: Repository<ClientType>) {
    super(ClientType, repository);
  }
}
