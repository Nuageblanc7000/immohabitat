import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PropertyModule } from './property/property.module';
import { UsersModule } from './users/users.module';
import { TypesModule } from './types/types.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { ValidatorsModule } from './validators/validators.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MailerModule } from './mailer/mailer.module';
import { FavoriteModule } from './favorite/favorite.module';
import { SuccessInterceptor } from './shared/interceptor/SuccessInterceptor.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PropertyModule,
    UsersModule,
    TypesModule,
    AuthModule,
    ValidatorsModule,
    DatabaseModule,
    MailerModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: SuccessInterceptor },
  ],
})
export class AppModule {}
