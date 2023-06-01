import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeDto } from './create-type.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTypeDto extends PartialType(CreateTypeDto) {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description?: string;
}
