import { ServiceBase } from '../../common/helpers/service.base';
import { ServiceContract } from './entities/service-contract.entity';
import { Repository, EntityManager } from 'typeorm';
import { CreateServiceContractDto } from './dto/create-service-contract.dto';
import { UpdateServiceContractDto } from './dto/update-service-contract.dto';
export declare class ServiceContractService extends ServiceBase<ServiceContract> {
    protected readonly repository: Repository<ServiceContract>;
    constructor(repository: Repository<ServiceContract>);
    createInTxChain(data: CreateServiceContractDto, manager?: EntityManager): Promise<ServiceContract>;
    updateInTxChain(id: number, data: UpdateServiceContractDto, manager?: EntityManager): Promise<ServiceContract>;
    setStatusByIdInTxChain(id: number, status: string, manager?: EntityManager): Promise<ServiceContract>;
}
