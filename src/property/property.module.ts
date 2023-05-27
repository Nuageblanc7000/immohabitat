import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/shared/entities/property.entity';
import { LocationEntity } from 'src/shared/entities/location.entity';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService],
  imports: [TypeOrmModule.forFeature([PropertyEntity, LocationEntity])],
})
export class PropertyModule {}
