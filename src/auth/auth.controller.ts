import {
  BadRequestException,
  Body,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SuccessResponse } from 'src/shared/responses/success.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(
    @Body(ValidationPipe) newUser: CreateUserDto,
  ): Promise<SuccessResponse> {
    const { email, password } = newUser;
    const data = await this.authService.register(email, password);
    return new SuccessResponse(data, 'success', 201);
  }
}
