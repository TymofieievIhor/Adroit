import { ControllerBase } from '../../common/helpers/controller.base';
import { VehicleInsurance } from './vehicle-insurance.entity';
import { VehicleInsuranceService } from './vehicle-insurance.service';
export declare class VehicleInsuranceController extends ControllerBase<VehicleInsurance> {
    protected service: VehicleInsuranceService;
    constructor(service: VehicleInsuranceService);
}
