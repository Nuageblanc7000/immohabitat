import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { PropertyEntity } from './property.entity';
import { LifeTimeEntity } from './lifetime.entity';

@Entity('favorites')
export class FavoriteEntity extends LifeTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: false })
  isFavorite: boolean;

  @ManyToOne(() => UserEntity, (user) => user.favorites)
  user: UserEntity;

  @ManyToOne(() => PropertyEntity, (property) => property.favorites)
  property: PropertyEntity;
}
