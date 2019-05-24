import { ControllerBase } from '../../common/helpers/controller.base';
import { ApiClientService } from './api-client.service';
import { ApiClient } from './api-client.entity';
export declare class ApiClientController extends ControllerBase<ApiClient> {
    protected service: ApiClientService;
    constructor(service: ApiClientService);
}
