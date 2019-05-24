import { LocationType } from './location-type.entity';
import { LocationTypeService } from './location-type.service';
import { ControllerBase } from '../../common/helpers/controller.base';
export declare class LocationTypeController extends ControllerBase<LocationType> {
    protected service: LocationTypeService;
    constructor(service: LocationTypeService);
}
