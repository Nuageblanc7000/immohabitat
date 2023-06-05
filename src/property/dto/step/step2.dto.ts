import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  Validate,
} from 'class-validator';
import { ValidDateConstraint } from 'src/shared/validatorCustom/validator.date';

export class Step2Dto {
  @IsOptional()
  @Validate(ValidDateConstraint)
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
}
