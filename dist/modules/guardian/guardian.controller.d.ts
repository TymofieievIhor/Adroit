import { ControllerBase } from '../../common/helpers/controller.base';
import { Guardian } from './guardian.entity';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { GuardianService } from './guardian.service';
export declare class GuardianController extends ControllerBase<Guardian> {
    protected service: GuardianService;
    constructor(service: GuardianService);
    create(body: CreateGuardianDto): Promise<Guardian>;
}
