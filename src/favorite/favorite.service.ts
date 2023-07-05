import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from 'src/shared/entities/favorite.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
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
  // async toggleFavorite(
  //   users: UserEntity,
  //   propertyId: propertyIdDto,
  // ): Promise<boolean> {
  //   const property = await this.propertyRepo.findOne({
  //     where: { id: propertyId.propertyId },
  //   });
  //   if (!property) return false;
  //   const existingFavorite = await this.favoriteRepo.findOne({
  //     withDeleted: true,
  //     where: {
  //       user: { id: users['id'] },
  //       property: { id: property['id'] },
  //     },
  //   });
  //   if (existingFavorite !== null && !existingFavorite?.deletedAt) {
  //     existingFavorite.isFavorite = false;
  //     existingFavorite.save();
  //     await this.favoriteRepo.remove(existingFavorite);

  //     return false; // Le favori a été supprimé
  //   } else if (
  //     existingFavorite?.deletedAt !== null &&
  //     existingFavorite?.deletedAt !== undefined
  //   ) {
  //     existingFavorite.deletedAt = null;
  //     existingFavorite.isFavorite = true;
  //     existingFavorite.save();
  //     return true;
  //   } else {
  //     const newFavorite = new FavoriteEntity();
  //     newFavorite.user = users;
  //     newFavorite.property = property;
  //     await this.favoriteRepo.save(newFavorite);
  //     return true; // Le favori a été ajouté
  //   }
  // }
  async toggleFavorite(
    users: UserEntity,
    propertyId: propertyIdDto,
  ): Promise<boolean> {
    const property = await this.propertyRepo.findOne({
      where: { id: propertyId.propertyId },
    });
    if (!property) return false;
    const existingFavorite = await this.favoriteRepo.findOne({
      where: {
        user: { id: users['id'] },
        property: { id: property['id'] },
      },
    });
    if (!!existingFavorite) {
      existingFavorite.remove();
      return false;
    } else {
      const newFavorite = new FavoriteEntity();
      newFavorite.user = users;
      newFavorite.property = property;
      newFavorite.isFavorite = true;
      await this.favoriteRepo.save(newFavorite);
      return true; // Le favori a été ajouté
    }
  }
  async findAll(user: UserEntity) {
    const [favorites, count] = await this.favoriteRepo.findAndCount({
      relations: ['property', 'property.images', 'property.location.city'],

      where: { user: { id: user['id'] } },
    });
    // console.log(favorites);
    return {
      favorites,
      count,
    };
  }
}
