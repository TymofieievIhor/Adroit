import { BadRequestException, Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/helpers/service.base';
import { Vehicle } from './vehicle.entity';
import { EntityManager, Repository, Transaction, TransactionManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleInsuranceService } from '../vehicle-insurance/vehicle-insurance.service';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleInsurance } from '../vehicle-insurance/vehicle-insurance.entity';
import { MISSING_RECORD } from '../../common/error-handling/exception-messages';

@Injectable()
export class VehicleService extends ServiceBase<Vehicle> {
  constructor(@InjectRepository(Vehicle) protected readonly repository: Repository<Vehicle>,
              private vehicleInsuranceService: VehicleInsuranceService) {
    super(Vehicle, repository);
  }

  @Transaction()
  async create(data: CreateVehicleDto, @TransactionManager() manager?: EntityManager): Promise<Vehicle> {
    return await this.createInTxChain(data, manager);
  }

  async createInTxChain(data: CreateVehicleDto, manager?: EntityManager, driverId?: number): Promise<Vehicle> {
    const vehicleInsurance = await this.vehicleInsuranceService.create(data.vehicle_insurance, manager);
    let vehicle = Object.assign(new Vehicle(), data.vehicle, {driver_id: driverId});
    vehicle.vehicle_insurance_id = vehicleInsurance.id;
    vehicle = await manager.save(Vehicle, vehicle);
    vehicle.vehicle_insurance = vehicleInsurance;
    return vehicle;
  }

  @Transaction()
  async updateById(id: number, data: UpdateVehicleDto, @TransactionManager() manager?: EntityManager): Promise<Vehicle> {
    return await this.updateByIdInTxChain(id, data, manager);
  }

  async updateByIdInTxChain(id: number, data: UpdateVehicleDto, manager?: EntityManager): Promise<Vehicle> {
    let vehicle = await manager.findOne(Vehicle, {id});
    if (!vehicle) {
      throw new BadRequestException(MISSING_RECORD);
    }
    let vehicleInsurance = await manager.findOne(VehicleInsurance, vehicle.vehicle_insurance_id);
    if (data.vehicle_insurance) {
      vehicleInsurance = await this.vehicleInsuranceService.updateByIdInTxChain(vehicleInsurance.id, data.vehicle_insurance, manager);
    }
    if (data.vehicle) {
      vehicle = await manager.save(Vehicle, Object.assign(vehicle, data.vehicle));
    }
    vehicle.vehicle_insurance = vehicleInsurance;
    return vehicle;
  }
}
