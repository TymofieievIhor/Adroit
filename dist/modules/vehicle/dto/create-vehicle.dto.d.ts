import { VehicleSimpleDto } from './vehicle-simple.dto';
import { CreateVehicleInsuranceDto } from '../../vehicle-insurance/dto/create-vehicle-insurance.dto';
export declare class CreateVehicleDto {
    vehicle: VehicleSimpleDto;
    vehicle_insurance: CreateVehicleInsuranceDto;
}
