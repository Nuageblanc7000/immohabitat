import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { SuccessResponse } from 'src/shared/responses/success.response';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body(new ValidationPipe({ whitelist: true })) newUser: CreateUserDto,
  ) {
    const data = await this.authService.signup(newUser);
    return data;
  }

  @Post('signin')
  async signin(
    @Body(new ValidationPipe({ whitelist: true })) signinDto: SignInDto,
  ) {
    const { email, password } = signinDto;
    const data = await this.authService.signin(email, password);
    return data;
  }
}
