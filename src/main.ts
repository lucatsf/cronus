import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Intl.DateTimeFormat().resolvedOptions().timeZone = 'America/Sao_Paulo';
  const config = new DocumentBuilder()
  .setTitle('Operatio API')
  .setDescription('The operatio API description')
  .setVersion('1.0')
  .addTag('operatio')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  await app.listen(process.env.PORT || 3000 );
}
bootstrap();
