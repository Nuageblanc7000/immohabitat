import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../auth/dto/create-user.dto';
import {
  IsString,
  IsEmail,
  Matches,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  firstname: string;
  @IsNotEmpty()
  @IsString()
  lastname: string;
  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}

// @IsNotEmpty()
// @IsString()
// @IsEmail()
// email: string;
