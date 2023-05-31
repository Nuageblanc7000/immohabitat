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
import { ExistMiddleware } from 'src/shared/middleware/exist/exist.middleware';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService],
  imports: [
    TypeOrmModule.forFeature([PropertyEntity, TypeEntity, LocationEntity]),
  ],
})
export class PropertyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExistMiddleware)
      .exclude(
        { path: 'properties', method: RequestMethod.POST },
        { path: 'properties', method: RequestMethod.GET },
      )
      .forRoutes(PropertyController);
  }
}
