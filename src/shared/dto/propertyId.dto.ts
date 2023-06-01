import { IsNumber } from 'class-validator';

export class propertyIdDto {
  @IsNumber()
  propertyId: number;
}
