import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { RolesGuard } from 'src/shared/guard/roles/roles.guard';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true })) createTypeDto: CreateTypeDto,
  ) {
    return this.typesService.create(createTypeDto);
  }

  @Get()
  findAll() {
    return this.typesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesService.findOne(+id);
  }
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body(new ValidationPipe({ whitelist: true })) updateTypeDto: UpdateTypeDto,
  ) {
    return this.typesService.update(+id, updateTypeDto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesService.remove(+id);
  }
}
