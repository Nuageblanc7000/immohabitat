import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserEntity } from 'src/shared/entities/user.entity';
import { UserDTO } from './dto/user.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { RolesGuard } from 'src/shared/guard/roles/roles.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  update(
    @Body(new ValidationPipe({ whitelist: true })) updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    const user = Object.assign(new UserEntity(), req.user);
    console.log(plainToClass(UserDTO, user));
    return this.usersService.update(user, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('password-modify')
  updatePassword(
    @Body(new ValidationPipe({ whitelist: true }))
    updatePasswordDto: UpdatePasswordDto,
    @Req() req: Request,
  ) {
    const user = Object.assign(new UserEntity(), req.user);
    console.log(plainToClass(UserDTO, user));
    return this.usersService.updatePassword(user, updatePasswordDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('email-modify')
  updateEmail(
    @Body(new ValidationPipe({ whitelist: true }))
    updateEmailDto: UpdateEmailDto,
    @Req() req: Request,
  ) {
    const user = Object.assign(new UserEntity(), req.user);
    console.log(plainToClass(UserDTO, user));
    return this.usersService.updateEmail(user, updateEmailDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  remove(@Req() req: Request) {
    const user = Object.assign(new UserEntity(), req.user);
    return this.usersService.remove(user);
  }
}
