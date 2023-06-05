import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isLocationValid', async: false })
export class IsLocationValidConstraint implements ValidatorConstraintInterface {
  validate(location: any, args: ValidationArguments) {
    if (!location) {
      return false; // L'objet location est manquant
    }

    const { street, post_code, city } = location;

    if (!street || !post_code || !city) {
      return false; // Un champ obligatoire est manquant
    }

    return true; // La validation réussit
  }

  defaultMessage(args: ValidationArguments) {
    return "L'objet location est invalide"; // Message d'erreur par défaut
  }
}
