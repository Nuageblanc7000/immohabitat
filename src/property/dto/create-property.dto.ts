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
import { LocationDTO } from 'src/shared/dto/locationCreate.dto';
import { ValidDateConstraint } from 'src/shared/validatorCustom/validator.date';
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

  @IsNotEmpty()
  @IsNumber()
  typeId: number;

  @ValidateNested()
  @Type(() => LocationDTO)
  location: LocationDTO;
}
