import { ApiModelProperty } from '@nestjs/swagger';
import { VehicleSimpleDto } from './vehicle-simple.dto';
import { CreateVehicleInsuranceDto } from '../../vehicle-insurance/dto/create-vehicle-insurance.dto';

export class CreateVehicleDto {
  @ApiModelProperty({required: true})
  vehicle: VehicleSimpleDto;

  @ApiModelProperty({required: true})
  vehicle_insurance: CreateVehicleInsuranceDto;
}