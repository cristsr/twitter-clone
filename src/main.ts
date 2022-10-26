import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ENV } from 'environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  app.setGlobalPrefix('api');

  app.enableVersioning();

  const port = configService.get(ENV.PORT);

  await app.listen(port);

  Logger.log(`App running at port ${port}`, 'Bootstrap');
}
bootstrap();
