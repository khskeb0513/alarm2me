import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as expressBasicAuth from 'express-basic-auth';
import { Logger } from './logger/logger';
import { nanoid } from 'nanoid';

async function bootstrap() {
  await initializeApp({
    credential: credential.cert(
      join(__dirname, '..', 'alarm2me-firebase-adminsdk.json'),
    ),
  });
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const swaggerPassword = nanoid(16);
  await app.use(
    ['/api'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USERNAME]: swaggerPassword,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Alarm2.me')
    .setExternalDoc(
      'Concept of Site',
      'https://alarm2me.page.link/footerSourceLink',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  await app.use(cookieParser());
  await app.useStaticAssets(join(__dirname, '..', '..', 'ui/', 'build/'));
  await app.useLogger(await app.resolve(Logger));
  await app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
  await app.get(Logger).log({ swaggerPassword });
}
bootstrap();
