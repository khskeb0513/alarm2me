import { Module } from '@nestjs/common';
import { UserHttpModule } from './user/user-http.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { UserEntity } from './user/entity/user.entity';
import { AuthHttpModule } from './auth/auth-http.module';
import { GithubOauthEntity } from './auth/entity/github-oauth.entity';
import { MessageHttpModule } from './message/message-http.module';
import { DeviceHttpModule } from './device/device-http.module';
import { UserAuthTokenEntity } from './user/entity/user-auth-token.entity';
import { DeviceTokenEntity } from './device/entity/device-token.entity';
import { LoggerEntity } from './logger/entity/logger.entity';
import { LoggerHttpModule } from './logger/logger-http.module';
import { ConfigModule } from '@nestjs/config';
import {
  databaseConfig,
  oauthConfig,
  serverConfig,
} from './config/server.config';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig, databaseConfig, oauthConfig],
      validate,
      envFilePath: ['.development.env', '.production.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10),
      synchronize: true,
      entities: [
        UserEntity,
        GithubOauthEntity,
        UserAuthTokenEntity,
        DeviceTokenEntity,
        LoggerEntity,
      ],
    }),
    UserHttpModule,
    AuthHttpModule,
    MessageHttpModule,
    DeviceHttpModule,
    LoggerHttpModule,
  ],
})
export class AppModule {}
