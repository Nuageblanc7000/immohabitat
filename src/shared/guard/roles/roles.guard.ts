import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/shared/entities/user.entity';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest<Request>();

    const user: UserEntity = plainToInstance(UserEntity, request.user);
    const userRoles = user.roles;
    const requiredRoles =
      this.reflector.get<string[]>('ROLES_KEY', context.getHandler()) ||
      this.reflector.get<string[]>('ROLES_KEY', context.getClass());
    if (!requiredRoles) {
      return true;
    }
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
