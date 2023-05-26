import { IsString } from 'class-validator';

export class TypeDTO {
  @IsString()
  title: string;

  @IsString()
  description?: string;
}
