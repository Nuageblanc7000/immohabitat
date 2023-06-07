import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  Req,
  Session,
  BadRequestException,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  Query,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsOwnerGuard } from 'src/shared/guard/is-owner/is-owner.guard';
import { Step1Dto } from './dto/step/step1.dto';
import { Step2Dto } from './dto/step/step2.dto';
import { Step3Dto } from './dto/step/step3.dto';
import { Step4Dto } from './dto/step/step4.dto';
import { validate } from 'class-validator';
import { Step5Dto } from './dto/step/step5.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('properties')
export class PropertyController {
  private stepValid = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  };
  constructor(private readonly propertyService: PropertyService) {}
  // @UseGuards(AuthGuard('jwt'))
  @Post('step1')
  async stepOne(@Session() session, @Body() step1Dto: Step1Dto) {
    this.sessionCreate(session);

    const data = await this.propertyService.stepOne(session, step1Dto);
    return data;
  }
  // @UseGuards(AuthGuard('jwt'))
  @Post('step2')
  async stepTwo(@Session() session, @Body() step2Dto: Step2Dto) {
    this.sessionCreate(session);
    const data = await this.propertyService.stepTwo(session, step2Dto);
    return data;
  }
  // @UseGuards(AuthGuard('jwt'))
  @Post('step3')
  async stepThree(@Session() session, @Body() step3Dto: Step3Dto) {
    this.sessionCreate(session);
    const data = await this.propertyService.stepThree(session, step3Dto);
    return data;
  }
  // @UseGuards(AuthGuard('jwt'))
  @Post('step4')
  async stepFour(@Session() session, @Req() req, @Body() step4Dto: Step4Dto) {
    this.sessionCreate(session);
    const dto4 = Object.assign(new Step4Dto(), step4Dto);
    const data = await this.propertyService.stepFour(session, step4Dto);
    return data;
  }

  // @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(FilesInterceptor('images'))
  @FormDataRequest()
  @Post('step5')
  async stepFive(@Session() session, @Body() step5Dto: Step5Dto) {
    this.sessionCreate(session);
    const dto5 = Object.assign(new Step5Dto(), step5Dto);
    const data = await this.propertyService.stepFive(session, dto5);
    return data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Session() session,
    @Req() req,
    @Body()
    createPropertyDto: // new ValidationPipe({ whitelist: true })
    CreatePropertyDto,
  ) {
    this.sessionCreate(session);

    return await this.propertyService.create(
      session,
      createPropertyDto,
      req.user,
    );
  }

  @Get()
  findAll(@Query('city') query) {
    console.log(query);
    return this.propertyService.findAll(query);
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
    @Session() session,
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePropertyDto,
  ) {
    this.sessionCreate(session);
    return this.propertyService.update(session, +id, updatePropertyDto);
  }
  @UseGuards(IsOwnerGuard)
  @HttpCode(201)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.propertyService.remove(+id);
  }
  sessionCreate(@Session() session) {
    if (!session.validateStep && !session.step) {
      session.validateStep = this.stepValid;
      session.step = {};
    }
  }
}
