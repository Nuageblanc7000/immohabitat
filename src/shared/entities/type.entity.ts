import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { PropertyEntity } from './property.entity';
import { LifeTimeEntity } from './lifetime.entity';

@Entity('types')
@Unique(['title'])
export class TypeEntity extends LifeTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ nullable: true, type: 'text' })
  description: string;

  @OneToMany(() => PropertyEntity, (property) => property.type)
  properties: PropertyEntity[];
}
