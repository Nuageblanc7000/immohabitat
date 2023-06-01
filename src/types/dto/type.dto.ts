import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TypeDTO {
  @IsOptional()
  @Expose()
  @IsNumber()
  id?: number;
  @Expose()
  @IsString()
  title: string;
  @Expose()
  @IsString()
  description?: string;
}
