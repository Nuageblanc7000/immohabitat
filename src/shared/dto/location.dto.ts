import { IsString, IsDefined, IsNotEmpty } from 'class-validator';
import { CityDto } from './city.dto';

export class LocationDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  street: string;

  city: CityDto;

  // Autres propriétés de localisation si nécessaire
}
