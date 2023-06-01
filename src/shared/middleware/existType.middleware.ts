import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { TypeEntity } from '../entities/type.entity';

@Injectable()
export class ExistTypeMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(TypeEntity)
    private readonly propertyRepo: Repository<TypeEntity>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id ? +req.params.id : null;
    if (id !== null && isNaN(id))
      throw new NotFoundException('Aucune entité trouvée avec cette id');
    const entity = await this.propertyRepo.findOne({
      where: { id: id },
    });
    if (!entity)
      throw new NotFoundException('Aucune entité trouvée avec cette id');
    return next();
  }
}
