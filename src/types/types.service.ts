import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeEntity } from 'src/shared/entities/type.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { TypeDTO } from './dto/type.dto';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(TypeEntity)
    private readonly typeRepo: Repository<TypeEntity>,
  ) {}
  async create(createTypeDto: CreateTypeDto) {
    await this.existType(createTypeDto.title);
    const type = plainToClass(
      TypeDTO,
      await this.typeRepo.save(createTypeDto),
      { excludeExtraneousValues: true },
    );
    return type;
  }

  async findAll() {
    const [types] = await this.typeRepo.findAndCount();
    return { types };
  }

  async findOne(id: number) {
    const type = await this.typeRepo.findOneBy({ id: id });
    return { type };
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    await this.existType(updateTypeDto.title);
    const type = await this.typeRepo.update({ id: id }, updateTypeDto);
    return { type };
  }

  async remove(id: number) {
    const type = await this.typeRepo.findOneBy({ id: id });
    if (!type) throw new BadRequestException("Ce type n'existe pas");

    try {
      // Supprimer le type
      return await this.typeRepo.delete(id);
    } catch (error) {
      // Gérer l'erreur de contrainte de clé étrangère
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        throw new BadRequestException(
          'Impossible de supprimer ce type car il est lié à des entités.',
        );
      } else {
        // Gérer d'autres erreurs
        throw error;
      }
    }
  }
  async existType(title: string) {
    const typeExist = await this.typeRepo.findOneBy({ title: title });
    if (typeExist) throw new BadRequestException('Ce type existe déjà');
  }
}
