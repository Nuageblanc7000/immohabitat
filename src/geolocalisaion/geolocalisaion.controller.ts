import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GeolocalisaionService } from './geolocalisaion.service';
import { streetDto } from './dto/streetDto.dto';

@Controller('geo')
export class GeolocalisaionController {
  constructor(private readonly geolocalisaionService: GeolocalisaionService) {}

  @Post('street')
  async street(@Body() street: streetDto) {
    return await this.geolocalisaionService.searchByStreet(street);
  }
}
