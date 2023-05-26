import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { PropertyEntity } from 'src/shared/entities/property.entity';
import { PropertyDTO } from './dto/property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly entityRepository: Repository<PropertyEntity>,
  ) {}
  create(createPropertyDto: CreatePropertyDto) {
    return this.entityRepository.create(createPropertyDto);
  }

  findAll() {
    return this.entityRepository.findAndCount({
      relations: ['user', 'location', 'type'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
