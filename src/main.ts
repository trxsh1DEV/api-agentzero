import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { socketServer } from './socket';
import multipart from '@fastify/multipart';
import {
  MongoExceptionFilter,
  MongooseValidationExceptionFilter,
} from './exception-filter/mongoose.exception-filters';
import { Redis } from 'ioredis';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const redisClient: Redis = app.get('REDIS_CLIENT');

  app.enableCors();
  app.useGlobalFilters(
    new MongoExceptionFilter(),
    new MongooseValidationExceptionFilter(),
  );

  process.on('SIGINT', async () => {
    await redisClient.quit();
    process.exit(0);
  });

  await app.register(multipart);
  await app.listen(3000);
  socketServer.listen(8080);
}
bootstrap();
