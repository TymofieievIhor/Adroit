import { CreateLocationDto } from '../../location/dto/create-location.dto';
import { CreatePassengerSimpleDto } from './create-passenger-simple.dto';
import { CreateContactDto } from '../../contact/dto/create-contact.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateGuardianDto } from '../../guardian/dto/create-guardian.dto';

export class CreatePassengerDto {
  @ApiModelProperty({required: true})
  passenger: CreatePassengerSimpleDto;

  @ApiModelProperty({required: true})
  locations: CreateLocationDto[];

  @ApiModelProperty({})
  guardians?: CreateGuardianDto[];

  @ApiModelProperty()
  contacts?: CreateContactDto[];
}