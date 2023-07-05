import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UserEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'isEmailUserAlreadyExist', async: true })
@Injectable()
export class IsEmailUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(UserEntity) readonly userRepo: Repository<UserEntity>,
  ) {}
  async validate(email: string) {
    return await this.userRepo.exist({ where: { email: email } });
  }
}

export function IsEmailUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUserAlreadyExistConstraint,
    });
  };
}
