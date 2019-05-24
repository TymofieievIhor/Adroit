import { Guardian } from './guardian.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { AccountService } from '../account/account.service';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { ServiceBase } from '../../common/helpers/service.base';
import { UpdateGuardianDto } from './dto/update-guardian.dto';
export declare class GuardianService extends ServiceBase<Guardian> {
    protected repository: Repository<Guardian>;
    private accountService;
    constructor(repository: Repository<Guardian>, accountService: AccountService);
    createInTxChain(data: CreateGuardianDto, manager?: EntityManager): Promise<Guardian>;
    updateByIdInTxChain(id: number, body: UpdateGuardianDto, manager?: EntityManager, owner?: {
        name: string;
        id: number;
    }): Promise<Guardian>;
    findById(id: number): Promise<Guardian>;
    find(data?: any, pagination?: BasicPaginationDto): Promise<IResponseWithPagination<Guardian>>;
    private findWithRelations;
}
