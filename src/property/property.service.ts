import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyEntity } from 'src/shared/entities/property.entity';

import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/shared/entities/user.entity';
import { TypeEntity } from 'src/shared/entities/type.entity';
import { LocationEntity } from 'src/shared/entities/location.entity';
import { Step1Dto } from './dto/step/step1.dto';
import { Step2Dto } from './dto/step/step2.dto';
import { Step3Dto } from './dto/step/step3.dto';
import { ValidationError, validate } from 'class-validator';

import { Step4Dto } from './dto/step/step4.dto';
import { Step5Dto } from './dto/step/step5.dto';
import { GeolocalisaionService } from 'src/geolocalisaion/geolocalisaion.service';
import { CityEntity } from 'src/shared/entities/city.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
    @InjectRepository(TypeEntity)
    private readonly typeRepository: Repository<TypeEntity>,
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
    @InjectRepository(CityEntity)
    private readonly repoCity: Repository<CityEntity>,
    private geoService: GeolocalisaionService,
  ) {}

  async stepOne(session, step1Dto: Step1Dto) {
    const dto1 = Object.assign(new Step1Dto(), step1Dto);
    const data = await this.validateStep(session, dto1, 0);

    return data;
  }
  async stepTwo(session, step2Dto: Step2Dto) {
    const dto2 = Object.assign(new Step2Dto(), step2Dto);
    const data = await this.validateStep(session, dto2, 1);
    return data;
  }
  async stepThree(session, step3Dto: Step3Dto) {
    const dto3 = Object.assign(new Step3Dto(), step3Dto);
    const data = await this.validateStep(session, dto3, 2);
    return data;
  }
  async stepFour(session, step4Dto: Step4Dto) {
    const dto4 = Object.assign(new Step4Dto(), step4Dto);
    const data = await this.validateStep(session, dto4, 3);
    return data;
  }
  async stepFive(session, step5Dto) {
    const dto5 = Object.assign(new Step5Dto(), step5Dto);
    const data = await this.validateStep(session, dto5, 4);
    return data;
  }

  async create(createPropertyDto, session, user: UserEntity) {
    await this.lastValidation(session, createPropertyDto);
    const type = await this.typeRepository.findOne({
      where: { id: session.step.typeId },
    });

    const city = await this.repoCity.findOne({
      where: { id: createPropertyDto.location.cityId },
    });

    if (!type) {
      throw new BadRequestException(
        'Veuillez indiquer un type de bien existant',
      );
    }

    const property = plainToClass(PropertyEntity, createPropertyDto);
    property.user = user;
    property.type = type;
    property.location.city = city;
    const saveProperty = await this.propertyRepository.save(property);
    delete session.validateStep;
    delete session.step;
    return saveProperty;
  }

  async findAll(
    city: string,
    minPrice: number,
    maxPrice: number,
    type: string,
  ) {
    let properties, count;

    const findCity =
      city && city.trim().length > 0 ? city.trim().toLowerCase() : null;

    const query = this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.location', 'location')
      .leftJoinAndSelect('location.city', 'city')
      .leftJoinAndSelect('property.type', 'type')
      .leftJoinAndSelect('property.images', 'images');

    if (findCity) {
      query.andWhere('city.localite like :t', { t: `%${findCity}%` });
    }

    if (minPrice) {
      query.andWhere('property.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      query.andWhere('property.price <= :maxPrice', { maxPrice });
    }

    if (type) {
      query.andWhere('type.title = :type', { type });
    }

    [properties, count] = await query.getManyAndCount();

    return {
      properties,
      count,
    };
  }

  async findOne(id: number) {
    const property = await this.propertyRepository.findOne({
      where: { id: id },
      relations: ['user', 'location', 'location.city', 'type', 'images'],
    });
    if (!property) throw new NotFoundException();
    return { property };
  }
  async findOneSlug(slug: string) {
    const property = await this.propertyRepository.findOne({
      where: { slug: slug },
      relations: ['user', 'location', 'type', 'city', 'images'],
    });
    if (!property) throw new NotFoundException();
    return { property };
  }

  async update(session, id: number, updatePropertyDto) {
    await this.lastValidation(session, updatePropertyDto);
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
    location.city = updatePropertyDto.location.cityId;
    updatedProperty.location = await this.locationRepository.save(location);
    delete session.validateStep;
    delete session.step;
    return { property: updatedProperty };
  }

  async remove(id: number) {
    const property = await this.propertyRepository.findOne({
      where: { id: id },
    });
    return { property: await this.propertyRepository.softRemove(property) };
  }

  //methods steps
  private async validateStep(session, dtoInstance: object, step: number) {
    const keyStep = Object.keys(session.validateStep)[step];

    const validation: ValidationError[] = await validate(dtoInstance);
    const formattedErrors = validation.map((error) => ({
      [error.property]: {
        property: error.property,
        constraints: error.constraints,
      },
    }));

    if (validation.length > 0) {
      session.validateStep[keyStep] = false;

      throw new BadRequestException({
        message: 'step invalide' + ' ' + keyStep,
        errors: formattedErrors,
      });
    }
    if (dtoInstance instanceof Step5Dto) {
      dtoInstance = { images: [] };
    }
    session.step = { ...session.step, ...dtoInstance };
    session.validateStep[keyStep] = true;
    return session.validateStep[keyStep];
  }

  validateAllStep(session) {
    let numberStepFail: string[] = [];
    for (let step in session.validateStep) {
      if (!session.validateStep[step]) {
        numberStepFail.push(step);
      }
    }

    if (numberStepFail.length > 0) {
      throw new BadRequestException({
        message: `Une ou plusieurs erreurs aux étapes ${numberStepFail.join(
          ',',
        )}`,
        ...session.validateStep,
        statusCode: 400,
      });
    }
  }

  async lastValidation(session, dto: any) {
    const step1 = await this.stepOne(session, dto);
    const step2 = await this.stepTwo(session, dto);
    const step3 = await this.stepThree(session, dto);
    const step4 = await this.stepFour(session, dto);
    const step5 = await this.stepFour(session, dto);
    const isValid: boolean[] = [step1, step2, step3, step4, step5];
    if (isValid.includes(false)) {
      this.validateAllStep(session);
    }
  }

  async findAllCityWithProperties() {
    return await this.repoCity
      .createQueryBuilder('city')
      .innerJoin('city.locations', 'location')
      .innerJoin('location.property', 'properties')
      .getMany();
  }

  async findNewProperties() {
    const timeNow = new Date().getTime();

    let days = 1;
    let properties = [];
    const count = await this.propertyRepository.count();
    if (count > 0) {
      while (properties.length < 2) {
        days++;
        const timeStart = timeNow - days * 24 * 60 * 60 * 1000;
        const startDate = new Date(timeStart);
        properties = await this.propertyRepository
          .createQueryBuilder('p')
          .leftJoinAndSelect('p.images', 'images')
          .leftJoinAndSelect('p.location', 'location')
          .leftJoinAndSelect('location.city', 'city')
          .leftJoinAndSelect('p.type', 'type')

          .where('p.createdAt > :startDate', { startDate })
          .take(6)
          .getMany();
      }
    }

    return { properties };
  }
}
