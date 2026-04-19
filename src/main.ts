import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
    new ValidationPipe({
      transform: true,              // string → number
      whitelist: true,              // buang field tidak dikenal
      forbidNonWhitelisted: true,   // error kalau ada field aneh
    }),
  )

    const config = new DocumentBuilder()
    .setTitle('WeRent Backend API')
    .setDescription('API Product & Reviews Documentation')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
