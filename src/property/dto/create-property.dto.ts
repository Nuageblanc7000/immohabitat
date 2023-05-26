import { CreateTypeDto } from 'src/types/dto/create-type.dto';

export class CreatePropertyDto {
  title: string;

  description: string;

  slug: string;

  price: number;

  yearBuilt: Date;

  room: number;

  floor: number;

  // Interior

  bedrooms: number;

  bathrooms: number;
  livingRoom: boolean;
  diningRoom: boolean;
  kitchenType: string;
  // Exterior
  garden: boolean;
  pool: boolean;
  terrace: boolean;
  balcony: boolean;
  garage: boolean;
  parking: boolean;
  courtyard: boolean;
  commonOutdoorSpaces: boolean;

  //relation:
}
