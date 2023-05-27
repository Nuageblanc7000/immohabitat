import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class AuthModule {}
