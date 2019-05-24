import { ApiModelProperty } from '@nestjs/swagger';
import { UpdateVehicleSimpleDto } from './update-vehicle-simple.dto';
import { UpdateVehicleInsuranceDto } from '../../vehicle-insurance/dto/update-vehicle-insurance.dto';
import { IsOptional } from 'class-validator';

export class UpdateVehicleDto {
  @ApiModelProperty()
  @IsOptional()
  vehicle?: UpdateVehicleSimpleDto;

  @ApiModelProperty()
  @IsOptional()
  vehicle_insurance?: UpdateVehicleInsuranceDto;
}