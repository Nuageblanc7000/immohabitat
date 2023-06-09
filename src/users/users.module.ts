import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { PropertyEntity } from 'src/shared/entities/property.entity';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MailerService],
  imports: [TypeOrmModule.forFeature([UserEntity, PropertyEntity])],
  exports: [UsersService],
})
export class UsersModule {}
