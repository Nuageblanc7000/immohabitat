import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { PropertyEntity } from './property.entity';
import { Exclude } from 'class-transformer';
import { LifeTimeEntity } from './lifetime.entity';
import { FavoriteEntity } from './favorite.entity';

@Entity('users')
@Unique(['email'])
export class UserEntity extends LifeTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @Column()
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @Exclude()
  @Column()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
    message:
      'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial.',
  })
  password: string;

  @Column({ type: 'simple-array' })
  roles: string[];

  @BeforeInsert()
  autoRole() {
    this.roles = ['user'];
  }
  @OneToMany(() => PropertyEntity, (property) => property.user, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  properties: PropertyEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  favorites: FavoriteEntity[];

  addRoles(roles: string | string[]) {
    this.roles = [
      ...(Array.isArray(this.roles) ? this.roles : []),
      ...(Array.isArray(roles) ? roles : [roles]),
    ];
  }
  removeRoles(roles: string) {
    this.roles = this.roles.filter((r) => r !== roles);
  }
}
