import { IsOptional, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdatePasswordDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
    message:
      'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial.',
  })
  password: string;
}
