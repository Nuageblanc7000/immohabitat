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

  findAll() {
    return this.typeRepo.findAndCount();
  }

  findOne(id: number) {
    return this.typeRepo.findOneBy({ id: id });
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    await this.existType(updateTypeDto.title);
    return await this.typeRepo.update({ id: id }, updateTypeDto);
  }

  async remove(id: number) {
    const type = await this.typeRepo.findOneBy({ id: id });
    if (!type) throw new BadRequestException("Ce type n'existe pas");
    return this.typeRepo.remove(type);
  }
  async existType(title: string) {
    const typeExist = await this.typeRepo.findOneBy({ title: title });
    if (typeExist) throw new BadRequestException('Ce type existe déjà');
  }
}
