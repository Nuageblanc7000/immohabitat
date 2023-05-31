import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { PropertyEntity } from './property.entity';

@Entity('favorites')
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: false })
  isFavorite: boolean;

  @ManyToOne(() => UserEntity, (user) => user.favorites)
  user: UserEntity;

  @ManyToOne(() => PropertyEntity, (property) => property.favorites)
  property: PropertyEntity;
}
