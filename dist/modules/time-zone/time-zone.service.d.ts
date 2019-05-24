import { ServiceBase } from '../../common/helpers/service.base';
import { TimeZone } from './time-zone.entity';
import { Repository } from 'typeorm';
export declare class TimeZoneService extends ServiceBase<TimeZone> {
    protected repository: Repository<TimeZone>;
    constructor(repository: Repository<TimeZone>);
}
