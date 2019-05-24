import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { PermissionAccess } from './permission-access.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionAccessService extends ServiceBase<PermissionAccess> {
  constructor(@InjectRepository(PermissionAccess) protected readonly repository: Repository<PermissionAccess>) {
    super(PermissionAccess, repository);
  }
}
