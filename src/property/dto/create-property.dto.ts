import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LocationDTO } from 'src/shared/dto/locationCreate.dto';
export class CreatePropertyDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsDate()
  @IsNotEmpty()
  yearBuilt: Date;

  @IsNotEmpty()
  @IsNumber()
  room: number;

  @IsNotEmpty()
  @IsNumber()
  floor: number;

  // Interior
  @IsNotEmpty()
  @IsNumber()
  bedrooms: number;
  @IsNotEmpty()
  @IsNumber()
  bathrooms: number;
  @IsOptional()
  @IsBoolean()
  livingRoom?: boolean;
  @IsOptional()
  @IsBoolean()
  diningRoom?: boolean;
  @IsOptional()
  @IsBoolean()
  kitchenType: string;
  // Exterior
  @IsOptional()
  @IsBoolean()
  garden?: boolean;
  @IsOptional()
  @IsBoolean()
  pool?: boolean;
  @IsOptional()
  @IsBoolean()
  terrace?: boolean;
  @IsOptional()
  @IsBoolean()
  balcony?: boolean;
  @IsOptional()
  @IsBoolean()
  garage?: boolean;
  @IsOptional()
  @IsBoolean()
  parking?: boolean;
  @IsOptional()
  @IsBoolean()
  courtyard?: boolean;
  @IsOptional()
  @IsBoolean()
  commonOutdoorSpaces?: boolean;

  @IsNotEmpty()
  @IsNumber()
  typeId: number;

  @ValidateNested()
  @Type(() => LocationDTO)
  location: LocationDTO;
}
