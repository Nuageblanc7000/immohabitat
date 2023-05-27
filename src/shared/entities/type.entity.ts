import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PropertyEntity } from './property.entity';
import { LifeTimeEntity } from './lifetime.entity';

@Entity('types')
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
