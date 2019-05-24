import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { TimeZone } from './time-zone.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TimeZoneService extends ServiceBase<TimeZone> {
  constructor(@InjectRepository(TimeZone) protected repository: Repository<TimeZone>) {
    super(TimeZone, repository);
  }
}
