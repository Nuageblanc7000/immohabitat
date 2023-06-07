import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from 'src/shared/entities/image.entity';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [TypeOrmModule.forFeature([ImageEntity])],
})
export class ImageModule {}
