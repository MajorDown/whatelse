import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              // enlève les propriétés inconnues
    forbidNonWhitelisted: true,  // renvoie une erreur si elles sont présentes
    transform: true,             // convertit les types automatiquement
  }));
}
bootstrap();
