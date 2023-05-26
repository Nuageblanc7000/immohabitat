import { IsString, IsNumber } from 'class-validator';

export class LocationDTO {
  @IsString()
  street: string;

  @IsNumber()
  post_code: number;

  @IsString()
  city: string;

  // Autres propriétés de localisation si nécessaire
}
