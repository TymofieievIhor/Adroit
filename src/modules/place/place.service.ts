import { ServiceBase } from '../../common/helpers/service.base';
import { Place } from './entities/place.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager, Repository, SelectQueryBuilder, Transaction, TransactionManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { LocationService } from '../location/location.service';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { LocationEntity } from '../location/location.entity';
import { IResponseWithPagination } from '../../common/helpers/interfaces/reponseWithPagination.interface';
import { BasicPaginationDto } from '../../common/helpers/basic-pagination.dto';
import { FindPlaceParamsDto } from './dto/find-place-params.dto';
import { SetArchivedStatusDto } from '../client/dto/set-archived-status.dto';
import { UtilsService } from '../../common/utils/utils.service';
import { TimeZoneService } from '../time-zone/time-zone.service';
import { TimeZone } from '../time-zone/time-zone.entity';

@Injectable()
export class PlaceService extends ServiceBase<Place> {
  constructor(@InjectRepository(Place) protected repository: Repository<Place>,
              private locationService: LocationService,
              private utilsService: UtilsService<Place>,
              private timeZoneService: TimeZoneService,
              ) {
    super(Place, repository);
  }

  @Transaction()
  async create(data: CreatePlaceDto, @TransactionManager() manager?: EntityManager): Promise<Place> {
    const place = Object.assign(new Place(), data.place);
    const location = await this.locationService.create(data.location, manager);
    place.location_id = location.id;
    const placeSaved = await manager.save(place);
    await this.locationService.createLink({name: 'place', id: placeSaved.id}, location.id, manager);
    placeSaved.location = location;
    placeSaved.time_zone = await this.timeZoneService.findOne({id: placeSaved.time_zone_id});
    return placeSaved;
  }

  async find(body: FindPlaceParamsDto, pagination: BasicPaginationDto): Promise<IResponseWithPagination<Place>> {
    const q = this.findWithRelations('t');
    const placeProps = ['name', 'phone_number'];
    for (const prop of Object.keys(body)) {
      if (prop === 'location') {
        q.andWhere(`location.street1 LIKE '%${body[prop]}%'`);
      } else if (prop === 'type') {
        q.andWhere(`location.type LIKE '%${body[prop]}%'`);
      } else if (prop === 'time_zone') {
        q.andWhere(`time_zone.abbreviation LIKE '%${body[prop]}%'`);
      } else if (placeProps.includes(prop)) {
        q.andWhere(`t.${prop} LIKE '%${body[prop]}%'`);
      }
    }
    return await super.find({}, pagination,
      () => q);
  }

  async findById(id: number): Promise<Place> {
    const q = this.findWithRelations('t')
      .andWhere('t.id = :id', {id});
    return await q.getOne();
  }

  @Transaction()
  async updateById(id: number, data: UpdatePlaceDto, @TransactionManager() manager?: EntityManager): Promise<Place> {
    const place = await manager.findOne(Place, {id, is_deleted: false, is_archived: false});
    if (!place) {
      throw new BadRequestException('The place cannot be updated');
    }
    if (data.place && Object.keys(data.place).length) {
      for (const field of Object.keys(data.place)) {
        place[field] = data.place[field];
      }
    }
    let newLoc;
    if (data.location && Object.keys(data.location).length) {
      const existingLoc = await this.locationService.findById(place.location_id);
      newLoc = await this.locationService.updateByIdInTxChain(existingLoc.id, data.location, {name: 'place', id: place.id}, manager);
      place.location_id = newLoc.id;
    }
    return await manager.save(place);
  }

  async setArchivedStatusById(id: number, body: SetArchivedStatusDto): Promise<void> {
    await this.utilsService.setArchivedStatusById(id, body, (alias) => this.findWithRelations(alias), this.repository);
  }
  private findWithRelations(alias: string): SelectQueryBuilder<Place> {
    return this.repository.createQueryBuilder(alias)
      .leftJoinAndMapOne(`${alias}.location`, LocationEntity, 'location', `${alias}.location_id = location.id`)
      .leftJoinAndMapOne(`${alias}.time_zone`, TimeZone, 'time_zone', `${alias}.time_zone_id = time_zone.id`)
      .where(`${alias}.is_deleted != true`);
  }

}