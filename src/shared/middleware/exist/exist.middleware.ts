import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { PropertyEntity } from 'src/shared/entities/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExistMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepo: Repository<PropertyEntity>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log(req.params);
    const id = req.params.id ? req.params.id : null;
    const slug = req.params.slug ? req.params.slug : null;
    const entity = await this.propertyRepo.findOne({
      where: [{ slug: slug }, { id: +id }],
    });
    if (!entity)
      throw new NotFoundException('Aucune entité trouvée avec cette id');
    return next();
  }
}
