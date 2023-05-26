import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PropertyEntity } from './property.entity';

@Entity('types')
export class TypeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ nullable: true, type: 'text' })
  description: string;

  @OneToMany(() => PropertyEntity, (property) => property.type)
  properties: PropertyEntity[];
}
