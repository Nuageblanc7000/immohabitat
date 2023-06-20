import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { PropertyEntity } from 'src/shared/entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IsOwnerGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    const propertyId = +request.params.id;
    const isOwner = await this.propertyRepository.findOne({
      where: { id: propertyId, user: { id: user['id'] } },
    });

    return !!isOwner;
  }
}
