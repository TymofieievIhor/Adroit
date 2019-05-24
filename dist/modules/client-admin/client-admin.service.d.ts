import { ServiceBase } from '../../common/helpers/service.base';
import { ClientAdmin } from './client-admin.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateClientAdminDto } from './dto/create-client-admin.dto';
import { AccountService } from '../account/account.service';
import { UpdateClientAdminDto } from './dto/update-client-admin.dto';
export declare class ClientAdminService extends ServiceBase<ClientAdmin> {
    protected readonly repository: Repository<ClientAdmin>;
    private accountService;
    constructor(repository: Repository<ClientAdmin>, accountService: AccountService);
    create(data: CreateClientAdminDto, manager?: EntityManager): Promise<ClientAdmin>;
    createInTxChain(data: CreateClientAdminDto, manager?: EntityManager): Promise<ClientAdmin>;
    updateByIdInTxChain(id: number, body: UpdateClientAdminDto, manager?: EntityManager, owner?: {
        name: string;
        id: number;
    }): Promise<ClientAdmin>;
}
