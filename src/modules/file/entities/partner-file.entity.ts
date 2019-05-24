import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';

@Entity('partner_file')
export class PartnerFile extends EntityBase {
  @Column({nullable: false})
  partner_id: number;

  @Column({nullable: false})
  file_id: number;
}