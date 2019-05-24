import {Body, Controller, Param, Patch, Post} from '@nestjs/common';
import {LocationService} from './location.service';
import {LocationEntity} from './location.entity';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {ControllerBase} from '../../common/helpers/controller.base';
import {CreateLocationDto} from './dto/create-location.dto';
import {UpdateLocationDto} from './dto/update-location.dto';

@ApiUseTags('location')
@Controller('private/location')
export class LocationController extends ControllerBase<LocationEntity> {
    constructor(protected service: LocationService) {
        super(service, {create: CreateLocationDto, update: UpdateLocationDto});
    }

    @Post()
    @ApiOperation({title: 'Create a new location'})
    async create(@Body() body: CreateLocationDto): Promise<LocationEntity> {
        return await this.service.create(body);
    }

    @Patch('/:id')
    @ApiOperation({title: 'Update a location by id'})
    async updateById(@Param('id') id: number, @Body() body: UpdateLocationDto): Promise<LocationEntity> {
        return await super.updateById(id, body);
    }
}
