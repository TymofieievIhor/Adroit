import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ApiUseTags, ApiOperation} from '@nestjs/swagger';
import {LocationType} from './location-type.entity';
import {LocationTypeService} from './location-type.service';
import {ControllerBase} from '../../common/helpers/controller.base';
import {CreateLocationTypeDto} from './dto/create-location-type.dto';
import {UpdateLocationDto} from '../location/dto/update-location.dto';

@ApiUseTags('location-type')
@Controller('private/location-type')
export class LocationTypeController extends ControllerBase<LocationType> {
    constructor(protected service: LocationTypeService) {
        super(service, {create: CreateLocationTypeDto, update: UpdateLocationDto});
    }
}
