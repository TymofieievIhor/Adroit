import { CreateLocationDto } from '../../location/dto/create-location.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { SimpleDriverLicenseDto } from './simple-driver-license.dto';

export class CreateDriverLicenseDto {
  @ApiModelProperty({required: true})
  driver_license: SimpleDriverLicenseDto;

  @ApiModelProperty({required: true})
  location: CreateLocationDto;
}