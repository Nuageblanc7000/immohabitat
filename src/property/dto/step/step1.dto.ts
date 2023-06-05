import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Step1Dto {
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
}
