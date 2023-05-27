import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { PropertyEntity } from './property.entity';
import { Exclude } from 'class-transformer';
import { LifeTimeEntity } from './lifetime.entity';

@Entity('users')
@Unique(['email'])
export class UserEntity extends LifeTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @Exclude()
  @Column()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
    message:
      'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial.',
  })
  password: string;

  @OneToMany(() => PropertyEntity, (property) => property.user, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  properties: PropertyEntity[];
}
