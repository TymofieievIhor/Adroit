import { BadRequestException, Injectable } from '@nestjs/common';
import { SetArchivedStatusDto } from '../../modules/client/dto/set-archived-status.dto';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class UtilsService<T extends {is_archived: boolean, archived_at: string}> {
  async setArchivedStatusById(id: number, body: SetArchivedStatusDto, queryBuilder: (alias) => SelectQueryBuilder<T>, repo: Repository<T>): Promise<void> {
    const q = queryBuilder('t')
      .andWhere('t.id = :id', {id});
    const item = await q.getOne();

    if (!item) {
      throw new BadRequestException('An item cannot be archived');
    }
    item.is_archived = body.archive;
    item.archived_at = body.archive ? (new Date()).toISOString() : null;

    await repo.save(Object.assign({}, item));
  }

  async modifyArrayEntities(data: any[], service, manager: EntityManager, ownerData?: {name: string, id: number}, accountId?: number): Promise<void> {
    const updatePromises = [];
    const deletePromises = [];
    for (const c of data) {
      if (c.hasOwnProperty('id') && Object.keys(c).length === 1) {
        deletePromises.push(service.deleteByIdInTxChain(c.id, manager, accountId));
      } else {
        const id = c.id;
        delete c.id;
        updatePromises.push(service.updateByIdInTxChain(id, c, manager, ownerData));
      }
    }
    await Promise.all([...updatePromises, ...deletePromises]);
  }
}
