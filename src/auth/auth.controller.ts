import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Request, Response, response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import * as passport from 'passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('currentuser')
  async currentUser(@Req() req: Request, @Res({ passthrough: true }) res) {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error) {
          return reject(error);
        }
        resolve(user ? { user } : null);
      })(req);
    });
  }

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
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = signinDto;
    const data = await this.authService.signin(email, password);
    response.cookie('token', data.access_token, {
      httpOnly: true,
      maxAge: 760000,
      sameSite: 'none',
      secure: true,
      domain: 'localhost',
      path: '/',
    });
    return data;
  }
  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return true;
  }
}
