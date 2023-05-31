import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Request,
  UseGuards,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsOwnerGuard } from 'src/shared/guard/is-owner/is-owner.guard';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Request() req,
    @Body(ValidationPipe) createPropertyDto: CreatePropertyDto,
  ) {
    return this.propertyService.create(createPropertyDto, req.user);
  }

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id(\\d+)')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.findOne(id);
  }
  // @Get(':slug')
  // findOneSlug(@Param('slug') slug: string) {
  //   return this.propertyService.findOneSlug(slug);
  // }

  @UseGuards(IsOwnerGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(+id, updatePropertyDto);
  }
  @UseGuards(IsOwnerGuard)
  @HttpCode(201)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.propertyService.remove(+id);
  }
}
