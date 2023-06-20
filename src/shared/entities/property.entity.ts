import {
  AfterInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { LocationEntity } from './location.entity';
import { UserEntity } from './user.entity';
import { TypeEntity } from './type.entity';
import slugify from 'slugify';
import { LifeTimeEntity } from './lifetime.entity';
import { FavoriteEntity } from './favorite.entity';
import { ImageEntity } from './image.entity';
@Entity('properties')
@Unique(['slug'])
export class PropertyEntity extends LifeTimeEntity {
  @AfterInsert()
  slugConverter(): void {
    this.slug = slugify(this.location.street + '-' + this.id, {
      lower: true,
      replacement: '-',
      strict: true,
    });
    this.save();
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  slug: string;

  @Column()
  price: number;

  @Column({ type: 'date' })
  yearBuilt: Date;

  @Column()
  room: number;

  @Column()
  floor: number;

  // Interior
  @Column({ type: 'integer' })
  bedrooms: number;

  @Column({ type: 'integer' })
  bathrooms: number;

  @Column({ type: 'boolean', default: false })
  livingRoom: boolean;

  @Column({ type: 'boolean', default: false })
  diningRoom: boolean;

  @Column({ nullable: true })
  kitchenType: string;

  // Exterior
  @Column({ type: 'boolean', default: false })
  garden: boolean;

  @Column({ type: 'boolean', default: false })
  pool: boolean;

  @Column({ type: 'boolean', default: false })
  terrace: boolean;

  @Column({ type: 'boolean', default: false })
  balcony: boolean;

  @Column({ type: 'boolean', default: false })
  garage: boolean;

  @Column({ type: 'boolean', default: false })
  parking: boolean;

  @Column({ type: 'boolean', default: false })
  courtyard: boolean;
  @Column({ type: 'boolean', default: false })
  commonOutdoorSpaces: boolean;

  //-------relations

  @OneToOne(() => LocationEntity, (location) => location.property, {
    cascade: ['soft-remove', 'insert', 'update'],
  })
  @JoinColumn()
  location: LocationEntity;

  @ManyToOne(() => UserEntity, (user) => user.properties, {
    nullable: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'soft-delete',
  })
  user: UserEntity;

  @ManyToOne(() => TypeEntity, (type) => type.properties)
  type: TypeEntity;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.property)
  favorites: FavoriteEntity[];

  @OneToMany(() => ImageEntity, (image) => image.property)
  images: ImageEntity[];
}
