import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UpdateLocationDto } from '../../location/dto/update-location.dto';
import { UpdateSimpleDriverLicenseDto } from './update-simple-driver-license.dto';

export class UpdateDriverLicenseDto {
  @ApiModelProperty()
  @IsOptional()
  driver_license?: UpdateSimpleDriverLicenseDto;

  @ApiModelProperty()
  @IsOptional()
  location?: UpdateLocationDto;
}