import { ControllerBase } from '../../common/helpers/controller.base';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';
export declare class VehicleController extends ControllerBase<Vehicle> {
    protected service: VehicleService;
    constructor(service: VehicleService);
}
