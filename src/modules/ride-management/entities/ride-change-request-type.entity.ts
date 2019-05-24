import { EntityBase } from '../../../common/helpers/entity.base';
import { Entity, Column } from 'typeorm';

@Entity('ride_change_request_type')
export class RideChangeRequestType extends EntityBase {
  @Column({nullable: false, unique: true})
  value: number;

  @Column({nullable: false})
  text_value: string;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false})
  display_in_user_interface: boolean = true;
}