import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { PropertyEntity } from 'src/shared/entities/property.entity';

import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/shared/entities/user.entity';
import { TypeEntity } from 'src/shared/entities/type.entity';
import { LocationEntity } from 'src/shared/entities/location.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
    @InjectRepository(TypeEntity)
    private readonly typeRepository: Repository<TypeEntity>,
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}
  async create(createPropertyDto: CreatePropertyDto, user: UserEntity) {
    const type = await this.typeRepository.findOne({
      where: { id: createPropertyDto.typeId },
    });

    if (!type) {
      throw new BadRequestException(
        'Veuillez indiquer un type de bien existant',
      );
    }
    const property = plainToClass(PropertyEntity, createPropertyDto);
    property.user = user;
    property.type = type;
    return await this.propertyRepository.save(property);
  }
  async findAll() {
    const [properties, count] = await this.propertyRepository.findAndCount({
      relations: ['location'],
    });

    return {
      properties: properties,
      count: count,
    };
  }

  async findOne(id: number) {
    const property = await this.propertyRepository.findOne({
      where: { id: id },
      relations: ['user', 'location', 'type'],
    });
    if (!property) throw new NotFoundException();
    return { property };
  }
  async findOneSlug(slug: string) {
    const property = await this.propertyRepository.findOne({
      where: { slug: slug },
      relations: ['user', 'location', 'type'],
    });
    if (!property) throw new NotFoundException();
    return { property };
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    const type = await this.typeRepository.findOne({
      where: { id: updatePropertyDto.typeId },
    });
    if (!type) {
      throw new BadRequestException(
        'Veuillez indiquer un type de bien existant',
      );
    }
    const propertyUpdate = await this.propertyRepository.findOne({
      where: { id: id },
      relations: ['location'],
    });

    if (!propertyUpdate) throw new NotFoundException();
    const updatedProperty = plainToClass(PropertyEntity, {
      ...propertyUpdate,
      ...updatePropertyDto,
    });
    const location = propertyUpdate.location;
    location.street = updatePropertyDto.location.street;
    location.post_code = updatePropertyDto.location.post_code;
    location.city = updatePropertyDto.location.city;
    updatedProperty.location = await this.locationRepository.save(location);
    return { property: updatedProperty };
  }

  async remove(id: number) {
    const property = await this.propertyRepository.findOne({
      where: { id: id },
    });
    return { property: await this.propertyRepository.softRemove(property) };
  }
}
