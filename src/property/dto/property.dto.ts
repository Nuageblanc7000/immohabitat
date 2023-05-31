import { LocationDto } from 'src/shared/dto/location.dto';
import { TypeDTO } from 'src/types/dto/type.dto';
import { UserDTO } from 'src/users/dto/user.dto';

export class PropertyDTO {
  title: string;
  description: string;
  price: number;
  yearBuilt: Date;
  room: number;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  livingRoom: boolean;
  diningRoom: boolean;
  kitchenType: string;
  garden: boolean;
  pool: boolean;
  terrace: boolean;
  balcony: boolean;
  garage: boolean;
  parking: boolean;
  courtyard: boolean;
  commonOutdoorSpaces: boolean;
  location: LocationDto;
  type: TypeDTO;
  user: UserDTO;
}
