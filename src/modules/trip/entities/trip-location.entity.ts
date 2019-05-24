import { EntityBase } from '../../../common/helpers/entity.base';
import { Column, Entity } from 'typeorm';
import { IsNumber, Length } from 'class-validator';

@Entity('trip_location')
export class TripLocation extends EntityBase {
  @Column({nullable: false})
  type_text_value: string;

  @Column({nullable: false})
  type_name: string;

  @Column('float', {nullable: false})
  @IsNumber()
  latitude: number;

  @Column('float', {nullable: false})
  @IsNumber()
  longitude: number;

  @Column({nullable: false})
  @Length(1, 256)
  street1: string;

  @Column()
  @Length(1, 128)
  street2: string;

  @Column({nullable: false})
  @Length(1, 128)
  city: string;

  @Column({nullable: false})
  @Length(1, 64)
  state: string;

  @Column('int', {nullable: false})
  @IsNumber()
  zipcode: number;

  @Column({nullable: false})
  @Length(1, 128)
  country: string;
}