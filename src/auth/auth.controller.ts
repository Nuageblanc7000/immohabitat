import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { SuccessResponse } from 'src/shared/responses/success.response';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('signup')
  async signup(
    @Body(ValidationPipe) newUser: CreateUserDto,
  ): Promise<SuccessResponse> {
    const { email, password } = newUser;
    const data = await this.authService.signup(email, password);
    return new SuccessResponse(data, 'success', 201);
  }

  @Post('signin')
  async signin(@Body() signinDto: SignInDto): Promise<SuccessResponse> {
    const { email, password } = signinDto;
    const data = await this.authService.signin(email, password);
    return new SuccessResponse(data, 'success', 200);
  }
}
