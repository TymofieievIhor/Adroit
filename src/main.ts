import { TypedEnv } from './common/env/constant';
import { localVariables } from './common/env/local-variables';

{
  if (TypedEnv.LOCAL_RUN) {
    Object.assign(TypedEnv, localVariables);
  } else if (TypedEnv.PROD_RUN) {
  }
}

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesGuard } from './modules/auth/roles/roles.guard';
import { GlobalExceptionFilter } from './common/error-handling/global-exception.filter';
import { HttpExceptionFilter } from './common/error-handling/http-exception.filter';
import {ValidationPipe} from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new GlobalExceptionFilter()); // TODO: implement more advanced error handling
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('Adroit System')
    .setDescription('The Adroit API description')
    .setVersion('1.0')
    .addBearerAuth()
    .setSchemes(TypedEnv.SWAGGER_HTTPS === 'true' ? 'https' : 'http')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);
  app.use(cors());
  await app.listen(TypedEnv.PORT);
}

bootstrap();
