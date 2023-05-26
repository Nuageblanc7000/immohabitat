import {
  IsNumber,
  IsString,
  IsBoolean,
  IsDate,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDTO } from 'src/shared/dto/location.dto';

export class PropertyDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsDate()
  yearBuilt: Date;

  @IsNumber()
  room: number;

  @IsNumber()
  floor: number;

  // Interior
  @IsNumber()
  bedrooms: number;

  @IsNumber()
  bathrooms: number;

  @IsBoolean()
  livingRoom: boolean;

  @IsBoolean()
  diningRoom: boolean;

  @IsOptional()
  @IsString()
  kitchenType: string;

  // Exterior
  @IsBoolean()
  garden: boolean;

  @IsBoolean()
  pool: boolean;

  @IsBoolean()
  terrace: boolean;

  @IsBoolean()
  balcony: boolean;

  @IsBoolean()
  garage: boolean;

  @IsBoolean()
  parking: boolean;

  @IsBoolean()
  courtyard: boolean;

  @IsBoolean()
  commonOutdoorSpaces: boolean;

  // Relations
  @ValidateNested()
  @Type(() => LocationDTO)
  location: LocationDTO;

  @IsNumber()
  typeId: number;
}
