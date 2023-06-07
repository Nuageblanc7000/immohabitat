import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LifeTimeEntity } from './lifetime.entity';
import { PropertyEntity } from './property.entity';

@Entity('images')
export class ImageEntity extends LifeTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  path: string;
  @Column({ default: true })
  tempo: boolean;

  @ManyToOne(() => PropertyEntity, (property) => property.images)
  property: PropertyEntity;
}
