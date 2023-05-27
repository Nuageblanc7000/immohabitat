import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) readonly userRepo: Repository<UserEntity>,
  ) {}

  async register(email: string, password: string): Promise<UserEntity> {
    const userExist = await this.userRepo.findOne({ where: { email: email } });
    if (userExist) throw new BadRequestException('Cet email existe déjà');
    // encrypted password + created salt
    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(password, salt);
    const userInstance = this.userRepo.create({
      email: email,
      password: hashPassword,
    });
    const newUser = await userInstance.save();
    return newUser;
  }

  login() {}

  logout() {}
}
