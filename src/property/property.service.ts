import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { PropertyEntity } from 'src/shared/entities/property.entity';
import { PropertyDTO } from './dto/property.dto';
import { LocationEntity } from 'src/shared/entities/location.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
    @InjectRepository(LocationEntity)
    private readonly LocationEntityRepository: Repository<LocationEntity>,
  ) {}
  create(createPropertyDto: CreatePropertyDto) {
    const property = plainToClass(PropertyEntity, createPropertyDto);
    return this.propertyRepository.save(property);
  }
  findAll() {
    return this.propertyRepository.findAndCount({
      relations: ['user', 'location', 'type'],
    });
  }

  findOne(id: number) {
    return this.propertyRepository.findOneOrFail({
      where: { id: id },
      relations: ['user', 'location', 'type'],
    });
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    const existingProperty = await this.propertyRepository.findOneOrFail({
      where: { id: id },
    });
    const updatedProperty = plainToClass(PropertyEntity, {
      ...existingProperty,
      ...updatePropertyDto,
    });
    return this.propertyRepository.save(updatedProperty, {});
  }

  async remove(id: number) {
    const property = await this.propertyRepository.findOne({
      where: { id: id },
    });
    return this.propertyRepository.softRemove(property);
  }
}
