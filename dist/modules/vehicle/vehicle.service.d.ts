import { ServiceBase } from '../../common/helpers/service.base';
import { Vehicle } from './vehicle.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleInsuranceService } from '../vehicle-insurance/vehicle-insurance.service';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
export declare class VehicleService extends ServiceBase<Vehicle> {
    protected readonly repository: Repository<Vehicle>;
    private vehicleInsuranceService;
    constructor(repository: Repository<Vehicle>, vehicleInsuranceService: VehicleInsuranceService);
    create(data: CreateVehicleDto, manager?: EntityManager): Promise<Vehicle>;
    createInTxChain(data: CreateVehicleDto, manager?: EntityManager, driverId?: number): Promise<Vehicle>;
    updateById(id: number, data: UpdateVehicleDto, manager?: EntityManager): Promise<Vehicle>;
    updateByIdInTxChain(id: number, data: UpdateVehicleDto, manager?: EntityManager): Promise<Vehicle>;
}
