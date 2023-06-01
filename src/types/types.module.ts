import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEntity } from 'src/shared/entities/type.entity';
import { ExistTypeMiddleware } from 'src/shared/middleware/existType.middleware';
@Module({
  controllers: [TypesController],
  providers: [TypesService],
  imports: [TypeOrmModule.forFeature([TypeEntity])],
})
export class TypesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExistTypeMiddleware)
      .exclude(
        { path: 'types', method: RequestMethod.POST },
        { path: 'types', method: RequestMethod.GET },
      )
      .forRoutes(TypesController);
  }
}
