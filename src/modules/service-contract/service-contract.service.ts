import { BadRequestException, Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { ServiceContract } from './entities/service-contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { CreateServiceContractDto } from './dto/create-service-contract.dto';
import { ServiceContractPricing } from './entities/service-contract-pricing.entity';
import { UpdateServiceContractDto } from './dto/update-service-contract.dto';
import { BASE_ENTITY_PROPS } from '../../common/helpers/constant';
import { ServiceContractStatus } from './entities/service-contract-status.entity';
import { MISSING_RECORD } from '../../common/error-handling/exception-messages';

@Injectable()
export class ServiceContractService extends ServiceBase<ServiceContract> {
  constructor(@InjectRepository(ServiceContract) protected readonly repository: Repository<ServiceContract>) {
    super(ServiceContract, repository);
  }

  async createInTxChain(data: CreateServiceContractDto, manager?: EntityManager): Promise<ServiceContract> {
    const existingContracts = await manager.find(ServiceContract, {client_id: data.client_id});
    if (existingContracts && existingContracts.length) {
      const updatePromises = [];
      for (const c of existingContracts) {
        c.service_contract_status_id = 4; // amended
        updatePromises.push(this.repository.save(c));
      }
      await Promise.all(updatePromises);
    }
    let contract = Object.assign(new ServiceContract(), data.contract, {service_contract_status_id: 3}, {client_id: data.client_id}); // active
    contract = await manager.save(contract);
    await manager.save(Object.assign(new ServiceContractPricing(), data.pricing, {service_contract_id: contract.id}));
    return contract;
  }

  async updateInTxChain(id: number, data: UpdateServiceContractDto, manager?: EntityManager): Promise<ServiceContract> {
    let existingContract = await manager.findOne(ServiceContract, {id, is_deleted: false});

    let newContract;
    if (existingContract) {
      newContract = Object.assign({}, existingContract);
      super.deleteProps(newContract, BASE_ENTITY_PROPS);

      await manager.save(Object.assign(existingContract, {service_contract_status_id: 4})); // amended
    }

    newContract = await manager.save(Object.assign(new ServiceContract(), {client_id: data.client_id, service_contract_status_id: 3}, newContract || {}, data.contract || {}));

    const pricing = await manager.findOne(ServiceContractPricing, {service_contract_id: existingContract ? existingContract.id : null});
    if (!pricing) {
      await manager.save(Object.assign(new ServiceContractPricing(), {service_contract_id: newContract.id}, data.pricing || {}));
    } else {
      await manager.save(Object.assign(pricing, {service_contract_id: newContract.id}, data.pricing || {}));
    }

    return newContract;
  }
  async setStatusByIdInTxChain(id: number, status: string, manager?: EntityManager): Promise<ServiceContract> {
    const serviceContract = await manager.findOne(ServiceContract, {id, service_contract_status_id: 3});
    if (!serviceContract) {
      throw new BadRequestException(MISSING_RECORD);
    }
    const s = await manager.findOne(ServiceContractStatus, {text_value: status.toLowerCase()});

    return s ? manager.save(Object.assign(serviceContract, {service_contract_status_id: s.id})) : serviceContract;
  }
}
