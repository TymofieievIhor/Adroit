import { Controller } from '@nestjs/common';
import { ControllerBase } from '../../common/helpers/controller.base';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './vehicle.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('vehicle')
@Controller('/private/vehicle')
export class VehicleController extends ControllerBase<Vehicle> {
  constructor(protected service: VehicleService) {
    super(service, {create: CreateVehicleDto, update: UpdateVehicleDto});
  }
}
