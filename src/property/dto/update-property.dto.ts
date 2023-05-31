import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { LocationDto } from 'src/shared/dto/location.dto';

import { ValidDateConstraint } from 'src/shared/validatorCustom/validator.date';
export class UpdatePropertyDto {
  @IsString()
  @IsDefined()
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
  @IsNotEmpty()
  @Validate(ValidDateConstraint, {
    message: 'Veuillez indiquer une data valide',
  })
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
  @IsString()
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
  @IsNumber()
  typeId: 1;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
