import { Controller } from '@nestjs/common';
import { TimeZone } from './time-zone.entity';
import { TimeZoneService } from './time-zone.service';
import { CreateTimeZoneDto } from './dto/create-time-zone.dto';
import { ControllerBase } from '../../common/helpers/controller.base';

@Controller('private/time-zone')
export class TimeZoneController extends ControllerBase<TimeZone> {
  constructor(protected service: TimeZoneService) {
    super(service, {create: CreateTimeZoneDto});
  }
}
