import { Module } from '@nestjs/common';
import { GeolocalisaionService } from './geolocalisaion.service';
import { GeolocalisaionController } from './geolocalisaion.controller';

@Module({
  controllers: [GeolocalisaionController],
  providers: [GeolocalisaionService]
})
export class GeolocalisaionModule {}
