import { IsString, IsNumber } from 'class-validator';

export class LocationUpdateDto {
  @IsNumber()
  id: number;
  @IsString()
  street: string;

  @IsString()
  post_code: string;

  @IsString()
  city: string;

  // Autres propriétés de localisation si nécessaire
}
