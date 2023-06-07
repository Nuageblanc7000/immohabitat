import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from 'src/shared/entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepo: Repository<ImageEntity>,
  ) {}
  async create(createImageDto: CreateImageDto) {
    return await this.imageRepo.create(createImageDto);
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
