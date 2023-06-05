import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class Step3Dto {
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
}
