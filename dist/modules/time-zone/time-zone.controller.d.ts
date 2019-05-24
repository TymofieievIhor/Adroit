import { TimeZone } from './time-zone.entity';
import { TimeZoneService } from './time-zone.service';
import { ControllerBase } from '../../common/helpers/controller.base';
export declare class TimeZoneController extends ControllerBase<TimeZone> {
    protected service: TimeZoneService;
    constructor(service: TimeZoneService);
}
