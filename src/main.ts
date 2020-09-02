import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const port = process.env.PORT || config.get('SERVER.PORT');
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
