import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { MailerModule } from 'src/mailer/mailer.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { strategyService } from './strategy.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, strategyService, ConfigService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MailerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('SECRET_TOKEN_KEY'),
        signOptions: { expiresIn: '30s' },
      }),
    }),
  ],
})
export class AuthModule {}
