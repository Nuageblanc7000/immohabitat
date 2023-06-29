import { BadRequestException, Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PropertyEntity } from 'src/shared/entities/property.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(PropertyEntity)
    private readonly propertyRepo: Repository<PropertyEntity>,
    private mailerService: MailerService,
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
    const t = await this.userRepo.update(user.id, updateUserDto);
    return updateUserDto;
  }
  async updatePassword(user: UserEntity, updatePasswordDto: UpdatePasswordDto) {
    if (updatePasswordDto.password) {
      const salt = await bcrypt.genSalt(8);
      const hashPassword = await bcrypt.hash(updatePasswordDto.password, salt);
      updatePasswordDto.password = hashPassword;
      const t = await this.userRepo.update(user.id, updatePasswordDto);
      return true;
    } else {
      return false;
    }
  }
  async updateEmail(user: UserEntity, updateEmail: UpdateEmailDto) {
    const existAccount = await this.userExists(updateEmail.email);
    if (existAccount) {
      throw new BadRequestException('Un compte existe déjà avec cet email');
    }
    this.mailerService.sendMail(
      user,
      { token: 'test' },
      "mise à jour de l'email",
    );
    const t = await this.userRepo.update(user.id, updateEmail);
    return updateEmail;
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
