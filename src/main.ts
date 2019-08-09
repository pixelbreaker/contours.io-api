import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const corsConfig = {
    origin: process.env.NODE_ENV === 'development' ? '*' : '*.contours.io',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  };
  const app = await NestFactory.create(AppModule, { cors: corsConfig });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
