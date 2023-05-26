import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PropertyEntity } from './property.entity';
@Entity('locations')
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;
  @Column()
  city: string;
  @Column()
  post_code: string;
  @OneToOne(() => PropertyEntity, (property) => property.location)
  property: PropertyEntity;
}
