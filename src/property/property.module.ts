import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/shared/entities/property.entity';
import { TypeEntity } from 'src/shared/entities/type.entity';
import { LocationEntity } from 'src/shared/entities/location.entity';
import { ExistMiddleware } from 'src/shared/middleware/exist/existProperty.middleware';
import { NestjsFormDataModule, MemoryStoredFile } from 'nestjs-form-data';
import { GeolocalisaionService } from 'src/geolocalisaion/geolocalisaion.service';
import { CityEntity } from 'src/shared/entities/city.entity';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService, GeolocalisaionService],
  imports: [
    TypeOrmModule.forFeature([
      PropertyEntity,
      TypeEntity,
      LocationEntity,
      CityEntity,
    ]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
})
export class PropertyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExistMiddleware)
      .exclude(
        { path: 'properties', method: RequestMethod.POST },
        { path: 'properties', method: RequestMethod.GET },
        { path: 'properties/cities', method: RequestMethod.GET },
        { path: 'properties/newProperties', method: RequestMethod.GET },
        { path: 'properties/step1', method: RequestMethod.POST },
        { path: 'properties/step2', method: RequestMethod.POST },
        { path: 'properties/step3', method: RequestMethod.POST },
        { path: 'properties/step4', method: RequestMethod.POST },
        { path: 'properties/step5', method: RequestMethod.POST },
      )
      .forRoutes(PropertyController);
  }
}
