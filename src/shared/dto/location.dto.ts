import { IsString, IsNumber, IsDefined, IsNotEmpty } from 'class-validator';

export class LocationDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  post_code: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  city: string;

  // Autres propriétés de localisation si nécessaire
}
