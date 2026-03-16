import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Vivian Rodrigues","https://github.com/dashenio","viviansrodrigues11@gmail.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  //  Definição da timezone para que fique registrado
  // corretamente no banco de dados
  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());

  // Permite aceitar requisições que venham de outros servidores
  // Pode receber parâmetros especificando tipos de plataforma
  // de onde aceita requisições
  app.enableCors();

  // porta por onde o app poderá ser acessado
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
