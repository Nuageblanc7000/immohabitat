import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

import { AuthGuard } from '@nestjs/passport';
import { propertyIdDto } from 'src/shared/dto/propertyId.dto';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  toggleFavorite(
    @Req() req,
    @Body(new ValidationPipe({ whitelist: true })) propertyId: propertyIdDto,
  ) {
    return this.favoriteService.toggleFavorite(req.user, propertyId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req) {
    const user = req.user;
    return this.favoriteService.findAll(user);
  }
}
