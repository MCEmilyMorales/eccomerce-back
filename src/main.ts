import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  //parsear cookies
  app.use(cookieParser());
  //permisos de cors
  const host = process.env.NODE_ENV === 'production';
  let origen = '';
  if (host) {
    origen = process.env.FRONTEND_ORIGIN;
  } else {
    origen = 'http://localhost:3000';
  }
  console.log('que valor tiene origin? d main', origen);

  app.enableCors({
    origin: origen,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  //convertir datos del cliente en json
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //configuracion de documentacion
  const swaggerConfig = new DocumentBuilder()
    .setTitle('proyecto eccommerce')
    .setDescription('Proyecto de ecommerce')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  //puerto en el que se levanta el back
  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`🚀 App corriendo en puerto ${port}`);
}
bootstrap();
