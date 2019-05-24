import { ApiModelProperty } from '@nestjs/swagger';
import { UpdatePassengerSimpleDto } from './update-passenger-simple.dto';
import { UpdateLocationDto } from '../../location/dto/update-location.dto';
import { UpdateContactDto } from '../../contact/dto/update-contact.dto';
import { UpdateGuardianDto } from '../../guardian/dto/update-guardian.dto';

export class UpdatePassengerDto {
  @ApiModelProperty({})
  passenger?: UpdatePassengerSimpleDto;

  @ApiModelProperty()
  locations?: UpdateLocationDto[];

  @ApiModelProperty({})
  guardians?: UpdateGuardianDto[];

  @ApiModelProperty()
  contacts?: UpdateContactDto[];

  account_id?: number;
}