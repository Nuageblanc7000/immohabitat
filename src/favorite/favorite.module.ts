import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from 'src/shared/entities/favorite.entity';
import { PropertyEntity } from 'src/shared/entities/property.entity';
@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [TypeOrmModule.forFeature([FavoriteEntity, PropertyEntity])],
})
export class FavoriteModule {}
