import { ControllerBase } from '../../common/helpers/controller.base';
import { PermissionAccess } from './permission-access.entity';
import { PermissionAccessService } from './permission-access.service';
export declare class PermissionAccessController extends ControllerBase<PermissionAccess> {
    protected service: PermissionAccessService;
    constructor(service: PermissionAccessService);
}
