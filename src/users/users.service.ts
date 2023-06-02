import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) readonly userRepo: Repository<UserEntity>,
  ) {}

  async findAll() {
    const [users] = await this.userRepo.findAndCount();
    return { users };
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneOrFail({ where: { id: id } });
    return { user };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    return this.userRepo.softRemove(user);
  }

  async userExists(email: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email: email } });
    return !!user; // Renvoie true si l'utilisateur existe, false sinon
  }
}
