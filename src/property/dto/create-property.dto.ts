import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { LocationDto } from 'src/shared/dto/location.dto';
import { IsLocationValidConstraint } from 'src/shared/validatorCustom/validateNestedLocation.validator';

import { ValidDateConstraint } from 'src/shared/validatorCustom/validator.date';
export class CreatePropertyDto {
  //step1
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  typeId: number;
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  //step3
  @IsOptional()
  @IsDate()
  yearBuilt: Date;
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  room: number;
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  floor: number;
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  bedrooms: number;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Max(40)
  @Min(1)
  bathrooms: number;

  @IsOptional()
  livingRoom: boolean;
  @IsOptional()
  @IsBoolean()
  diningRoom: boolean;
  @IsDefined()
  @IsIn(['équipée', 'non équipée', 'sans cuisine'])
  @IsString()
  kitchenType: string;

  //step3
  @IsOptional()
  @IsBoolean()
  garden: boolean;
  @IsOptional()
  @IsBoolean()
  pool: boolean;
  @IsOptional()
  @IsBoolean()
  terrace: boolean;
  @IsOptional()
  @IsBoolean()
  balcony: boolean;
  @IsOptional()
  @IsBoolean()
  garage: boolean;
  @IsOptional()
  @IsBoolean()
  parking: boolean;
  @IsOptional()
  @IsBoolean()
  courtyard: boolean;
  @IsOptional()
  @IsBoolean()
  commonOutdoorSpaces: boolean;

  //step4
  @IsDefined()
  @Validate(IsLocationValidConstraint)
  location: LocationDto;
}
