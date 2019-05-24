import { ControllerBase } from '../../common/helpers/controller.base';
import { ClientType } from './client-type.entity';
import { ClientTypeService } from './client-type.service';
export declare class ClientTypeController extends ControllerBase<ClientType> {
    protected service: ClientTypeService;
    constructor(service: ClientTypeService);
}
