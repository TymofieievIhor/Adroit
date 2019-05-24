import { Column, Entity } from 'typeorm';
import { EntityBase } from '../../common/helpers/entity.base';

@Entity({name: 'permission_access'})
export class PermissionAccess extends EntityBase {
  @Column({nullable: false})
  account_type: number;

  @Column({nullable: false})
  api_client: number;

  @Column({nullable: false})
  is_deleted: boolean;
}