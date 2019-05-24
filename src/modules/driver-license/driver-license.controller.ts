import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ControllerBase } from '../../common/helpers/controller.base';
import { DriverLicense } from './driver-license.entity';
import { DriverLicenseService } from './driver-license.service';
import { CreateDriverLicenseDto } from './dto/create-driver-license.dto';

@ApiUseTags('driver-license')
@Controller('/private/driver-license')
export class DriverLicenseController extends ControllerBase<DriverLicense> {
  constructor(protected service: DriverLicenseService) {
    super(service, {create: CreateDriverLicenseDto});
  }
}
