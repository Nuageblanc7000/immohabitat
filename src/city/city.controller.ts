import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { CitySearchDto } from './cittyDto/citySearch.dto';
import { plainToInstance } from 'class-transformer';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async findAll(@Body() locality: CitySearchDto) {
    console.log(locality);

    return this.cityService.getAll(locality);
  }
}
