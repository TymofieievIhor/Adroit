import { Column, ObjectLiteral, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as uuid from 'uuid4';

export abstract class EntityBase implements ObjectLiteral {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, default: uuid() })
    uuid: string = uuid();

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: string;

    @Column('datetime', { nullable: false, default: new Date() })
    created_at: string = (new Date()).toISOString();

    @Column({ nullable: false, default: false })
    is_deleted: boolean;

    @Column('datetime')
    deleted_at: string;
}
