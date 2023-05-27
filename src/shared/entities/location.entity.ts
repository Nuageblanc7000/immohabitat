import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PropertyEntity } from './property.entity';
import { LifeTimeEntity } from './lifetime.entity';
@Entity('locations')
export class LocationEntity extends LifeTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  street: string;
  @Column({ type: 'varchar' })
  city: string;
  @Column({ type: 'varchar' })
  post_code: string;
  @OneToOne(() => PropertyEntity, (property) => property.location)
  property: PropertyEntity;
}
