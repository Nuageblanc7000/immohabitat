import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { PropertyEntity } from './property.entity';
@Entity('locations')
export class LocationEntity {
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
