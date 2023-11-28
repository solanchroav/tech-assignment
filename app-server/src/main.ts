import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200', 
    credentials: true, 
  };
  
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
