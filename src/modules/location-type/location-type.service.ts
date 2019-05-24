import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {LocationType} from './location-type.entity';
import {ServiceBase} from '../../common/helpers/service.base';

@Injectable()
export class LocationTypeService extends ServiceBase<LocationType> {
    constructor(@InjectRepository(LocationType) protected readonly repository: Repository<LocationType>) {
        super(LocationType, repository);
    }
}