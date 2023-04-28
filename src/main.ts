import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import swaggerConfig from '@/config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { CustomValidationPipe } from './pipe/validation-pipe';
import { ExceptionFilter } from './exceptions/exception-filter';
import { join } from 'path';
async function bootstrap() {
  console.log(__dirname, 'dir', join(__dirname, 'public'));
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );
  app.useStaticAssets(join(__dirname, 'public'), {
    prefix: '/public/',
  });
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen(process.env.PORT || 3400);
}
bootstrap()
  .then(() => console.log('Application Started'))
  .catch((e) => console.log(e));
