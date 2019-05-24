import { ControllerBase } from '../../common/helpers/controller.base';
import { DriverLicense } from './driver-license.entity';
import { DriverLicenseService } from './driver-license.service';
export declare class DriverLicenseController extends ControllerBase<DriverLicense> {
    protected service: DriverLicenseService;
    constructor(service: DriverLicenseService);
}
