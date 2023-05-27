import { IsString, IsNumber } from 'class-validator';

export class LocationDTO {
  @IsString()
  street: string;

  @IsString()
  post_code: string;

  @IsString()
  city: string;

  // Autres propriétés de localisation si nécessaire
}
