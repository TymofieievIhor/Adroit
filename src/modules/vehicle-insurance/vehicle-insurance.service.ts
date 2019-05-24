import { BadRequestException, Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { VehicleInsurance } from './vehicle-insurance.entity';
import { EntityManager, Repository, Transaction, TransactionManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateVehicleInsuranceDto } from './dto/update-vehicle-insurance.dto';

@Injectable()
export class VehicleInsuranceService extends ServiceBase<VehicleInsurance> {
  constructor(@InjectRepository(VehicleInsurance) protected readonly repository: Repository<VehicleInsurance>) {
    super(VehicleInsurance, repository);
  }

  @Transaction()
  async updateById(id: number, data: UpdateVehicleInsuranceDto, @TransactionManager() manager?: EntityManager): Promise<VehicleInsurance> {
    return await this.updateByIdInTxChain(id, data, manager);
  }

  async updateByIdInTxChain(id: number, data: UpdateVehicleInsuranceDto, manager?: EntityManager): Promise<VehicleInsurance> {
    const vehicleInsurance = await manager.findOneOrFail(VehicleInsurance, id);
    if (vehicleInsurance.is_deleted) {
      throw new BadRequestException('The record cannot be updated');
    }
    return manager.save(VehicleInsurance, Object.assign(vehicleInsurance, data));
  }
}
