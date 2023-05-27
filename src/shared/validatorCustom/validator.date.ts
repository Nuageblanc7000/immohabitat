import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'validDate', async: false })
export class ValidDateConstraint implements ValidatorConstraintInterface {
  validate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
}
