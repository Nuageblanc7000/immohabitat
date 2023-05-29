import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        name: 'habitatConnection',
        type: 'mysql',
        host: config.get('MYSQL_DB_HOST'),
        port: +config.get('MYSQL_DB_PORT'),
        username: config.get('MYSQL_DB_USERNAME'),
        password: config.get('MYSQL_DB_PASSWORD'),
        database: config.get('MYSQL_DB_DATABASE'),
        supportTransactions: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],

        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
