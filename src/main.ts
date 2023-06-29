import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { GlobalExceptionFilter } from './shared/handler/error.handler';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  app.use(cookieParser(config.get('SECRET_TOKEN_KEY')));
  app.enableCors({ credentials: true, origin: 'http://localhost:4200' });
  const PORT = +config.get<number>('PORT');
  app.setGlobalPrefix('api');
  // app.useGlobalFilters(new GlobalExceptionFilter());
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(PORT);
}
bootstrap();
