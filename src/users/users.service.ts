import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PropertyEntity } from 'src/shared/entities/property.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) readonly userRepo: Repository<UserEntity>,
    @InjectRepository(PropertyEntity)
    readonly propertyRepo: Repository<PropertyEntity>,
  ) {}
  async findAll() {
    const [users] = await this.userRepo.findAndCount();
    return { users };
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneOrFail({ where: { id: id } });
    return { user };
  }

  async update(user: UserEntity, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(8);
      const hashPassword = await bcrypt.hash(updateUserDto.password, salt);
      updateUserDto.password = hashPassword;
    }
    const t = await this.userRepo.update(user.id, updateUserDto);
    return updateUserDto;
  }

  async remove(user: UserEntity) {
    const userFind = this.userRepo.findOne({
      where: { id: user.id },
      relations: { properties: true, favorites: true },
    });
    return (await userFind).softRemove();
  }

  async userExists(email: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email: email } });
    return !!user; // Renvoie true si l'utilisateur existe, false sinon
  }
}
