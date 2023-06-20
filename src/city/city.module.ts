import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from 'src/shared/entities/city.entity';

@Module({
  controllers: [CityController],
  imports: [TypeOrmModule.forFeature([CityEntity])],
  providers: [CityService],
})
export class CityModule {}
