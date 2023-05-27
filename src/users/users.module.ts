import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UsersService],
})
export class UsersModule {}
