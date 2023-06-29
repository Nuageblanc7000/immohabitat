import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
