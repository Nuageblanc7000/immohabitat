import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../auth/dto/create-user.dto';
import {
  IsEmpty,
  IsString,
  IsEmail,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
    message:
      'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial.',
  })
  password: string;
}
