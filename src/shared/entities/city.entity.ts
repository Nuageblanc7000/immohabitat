import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity('cities')
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  code: number;
  @Column({ type: 'varchar' })
  localite: string;
  @Column({ type: 'varchar' })
  longitude: string;
  @Column({ type: 'varchar' })
  latitude: string;
  @Column({ type: 'varchar' })
  coordonnees: string;
  @Column({ type: 'varchar' })
  geom: string;

  @OneToMany(() => LocationEntity, (location) => location.city)
  locations: LocationEntity[];
}
