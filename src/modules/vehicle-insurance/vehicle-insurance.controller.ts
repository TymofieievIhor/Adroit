import { Controller } from '@nestjs/common';
import { ControllerBase } from '../../common/helpers/controller.base';
import { VehicleInsurance } from './vehicle-insurance.entity';
import { CreateVehicleInsuranceDto } from './dto/create-vehicle-insurance.dto';
import { VehicleInsuranceService } from './vehicle-insurance.service';
import { UpdateVehicleInsuranceDto } from './dto/update-vehicle-insurance.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('vehicle-insurance')
@Controller('/private/vehicle-insurance')
export class VehicleInsuranceController extends ControllerBase<VehicleInsurance> {
  constructor(protected service: VehicleInsuranceService) {
    super(service, {create: CreateVehicleInsuranceDto, update: UpdateVehicleInsuranceDto});
  }
}
