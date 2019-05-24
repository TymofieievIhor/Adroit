import { ServiceBase } from '../../common/helpers/service.base';
import { VehicleInsurance } from './vehicle-insurance.entity';
import { EntityManager, Repository } from 'typeorm';
import { UpdateVehicleInsuranceDto } from './dto/update-vehicle-insurance.dto';
export declare class VehicleInsuranceService extends ServiceBase<VehicleInsurance> {
    protected readonly repository: Repository<VehicleInsurance>;
    constructor(repository: Repository<VehicleInsurance>);
    updateById(id: number, data: UpdateVehicleInsuranceDto, manager?: EntityManager): Promise<VehicleInsurance>;
    updateByIdInTxChain(id: number, data: UpdateVehicleInsuranceDto, manager?: EntityManager): Promise<VehicleInsurance>;
}
