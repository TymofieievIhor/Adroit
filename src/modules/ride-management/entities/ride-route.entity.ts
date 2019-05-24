import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';
import { RideBlueprint } from './ride-blueprint.entity';
import { Place } from '../../place/entities/place.entity';
import { Client } from '../../client/client.entity';
import { BlueprintTimeTypes} from '../../../common/helpers/constant';

@Entity('ride_route')
export class RideRoute extends EntityBase {

  @Column({nullable: false})
  has_am: boolean = false;

  @Column({nullable: false})
  has_am_late_start: boolean = false;

  @Column({nullable: false})
  has_pm: boolean = false;

  @Column({nullable: false})
  has_pm_early_return: boolean = false;

  @Column({nullable: false})
  is_recurring: boolean = true;

  @Column({nullable: false})
  is_active: boolean = true;

  @Column()
  is_archived: boolean;

  @Column('datetime')
  archived_at: string;

  @Column()
  archived_by_account_id: number;

  @Column()
  deleted_by_account_id: number;

  blueprints: RideBlueprint[];

  places: Place[];

  clients: Client[];
}