import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { PropertyEntity } from './property.entity';
import { LifeTimeEntity } from './lifetime.entity';
import { CityEntity } from './city.entity';
@Entity('locations')
export class LocationEntity extends LifeTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  street: string;
  @ManyToOne(() => CityEntity, (city) => city.locations)
  city: CityEntity;

  @OneToOne(() => PropertyEntity, (property) => property.location)
  property: PropertyEntity;
}
