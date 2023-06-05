import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  Validate,
  ValidateNested,
} from 'class-validator';
import { LocationDto } from 'src/shared/dto/location.dto';
import { IsLocationValidConstraint } from 'src/shared/validatorCustom/validateNestedLocation.validator';

export class Step4Dto {
  @IsDefined()
  @Validate(IsLocationValidConstraint)
  location: LocationDto;
}
