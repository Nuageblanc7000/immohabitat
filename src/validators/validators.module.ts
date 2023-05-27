import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { IsEmailUserAlreadyExistConstraint } from './validator.email';

@Module({
  providers: [IsEmailUserAlreadyExistConstraint],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [],
})
export class ValidatorsModule {}
