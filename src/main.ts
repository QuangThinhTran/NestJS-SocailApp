import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './services/logger.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useLogger(new LoggerService)
  app.useGlobalPipes(new ValidationPipe)
  app.enableCors()


  const config = new DocumentBuilder()
    .setTitle('Social API')
    .addBearerAuth()
    .setDescription('API Description')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3000);
}
bootstrap();
