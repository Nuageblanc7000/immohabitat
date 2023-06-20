import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/shared/entities/city.entity';
import { ILike, Repository } from 'typeorm';
import { CitySearchDto } from './cittyDto/citySearch.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepo: Repository<CityEntity>,
  ) {}
  async getAll(CitySearchDto: CitySearchDto) {
    const [cities, count] = await this.cityRepo.findAndCount({
      where: { localite: ILike(`%${CitySearchDto.locality}%`) },
      take: 10,
    });
    return {
      cities,
      count,
    };
  }
}
