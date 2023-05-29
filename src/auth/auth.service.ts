import {
  BadRequestException,
  Body,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { MailerService } from 'src/mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) readonly userRepo: Repository<UserEntity>,
    private mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string): Promise<UserEntity> {
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
    //send mail custom
    await this.mailerService.sendMail(newUser, {}, 'inscription à Immohabitat');

    return newUser;
  }

  async signin(email: string, password: string) {
    //on vérifie d'abord si il y a un user grace à un champ unique ici l'email puis on vérifie le mot de passe
    const user = await this.userRepo.findOne({ where: { email: email } });
    if (!user) throw new UnauthorizedException('Email ou password incorect');
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch)
      throw new UnauthorizedException('Email ou password incorect');

    const payload = { sub: user.id };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  logout() {}
}
