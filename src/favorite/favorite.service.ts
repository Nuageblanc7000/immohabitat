import { Injectable } from '@nestjs/common';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from 'src/shared/entities/favorite.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { UserDTO } from 'src/users/dto/user.dto';
import { propertyIdDto } from 'src/shared/dto/propertyId.dto';
import { PropertyEntity } from 'src/shared/entities/property.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepo: Repository<FavoriteEntity>,
    @InjectRepository(PropertyEntity)
    private readonly propertyRepo: Repository<PropertyEntity>,
  ) {}
  async toggleFavorite(
    users: UserEntity,
    propertyId: propertyIdDto,
  ): Promise<boolean> {
    const property = await this.propertyRepo.findOne({
      where: { id: propertyId.propertyId },
    });
    console.log(property);
    if (!property) return false;
    const existingFavorite = await this.favoriteRepo.findOne({
      where: {
        user: { id: users['id'] },
        property: { id: property['id'] },
      },
    });

    if (existingFavorite) {
      await this.favoriteRepo.remove(existingFavorite);
      return false; // Le favori a été supprimé
    } else {
      const newFavorite = new FavoriteEntity();
      newFavorite.user = users;
      newFavorite.property = property;
      await this.favoriteRepo.save(newFavorite);
      return true; // Le favori a été ajouté
    }
  }
  findAll(user: UserEntity) {
    return this.favoriteRepo.findAndCount({
      relations: ['property'],
      where: { user: { id: user['id'] } },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} favorite`;
  // }

  // update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
  //   return `This action updates a #${id} favorite`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} favorite`;
  // }
}
