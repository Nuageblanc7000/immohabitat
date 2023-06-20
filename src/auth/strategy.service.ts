import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { Request as RequestType } from 'express';

type Payload = {
  sub: number;
};
// creation du passort
@Injectable()
export class strategyService extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    @InjectRepository(UserEntity) readonly userRepo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        strategyService.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: config.get('SECRET_TOKEN_KEY'),
      ignoreExpiration: false,
    });
  }

  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && 'token' in req.cookies && req.cookies.token.length > 0) {
      return req.cookies.token;
    }
    return null;
  }

  async validate(payload: Payload) {
    const user = await this.userRepo.findOne({ where: { id: payload.sub } });
    if (!user) new UnauthorizedException('Accès refusé à la ressource');
    return user;
  }
}
