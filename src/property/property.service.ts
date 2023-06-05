import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';

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
import { validate } from 'class-validator';
import { log } from 'console';
import { Step4Dto } from './dto/step/step4.dto';

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
    console.log(dto4);
    const data = await this.validateStep(session, dto4, 3);
    return data;
  }
  async stepFive(session, Step5Dto) {}

  async create(
    session,
    createPropertyDto: CreatePropertyDto,
    user: UserEntity,
  ) {
    await this.lastValidation(session, createPropertyDto);
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
    const saveProperty = await this.propertyRepository.save(property);
    delete session.validateStep;
    delete session.step;
    return saveProperty;
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

  async update(session, id: number, updatePropertyDto) {
    await this.lastValidation(session, updatePropertyDto);

    return 'ok';
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

    if ((await validate(dtoInstance)).length > 0) {
      session.validateStep[keyStep] = false;
      return session.validateStep[keyStep];
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
    console.log(numberStepFail);
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
    const isValid: boolean[] = [step1, step2, step3, step4];
    if (isValid.includes(false)) {
      this.validateAllStep(session);
    }
  }
}
