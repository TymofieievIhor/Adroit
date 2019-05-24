import { LocationService } from './location.service';
import { LocationEntity } from './location.entity';
import { ControllerBase } from '../../common/helpers/controller.base';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationController extends ControllerBase<LocationEntity> {
    protected service: LocationService;
    constructor(service: LocationService);
    create(body: CreateLocationDto): Promise<LocationEntity>;
    updateById(id: number, body: UpdateLocationDto): Promise<LocationEntity>;
}
