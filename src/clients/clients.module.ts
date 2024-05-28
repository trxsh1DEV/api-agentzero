import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { Clients, ClientsSchema } from './schema/clients.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from 'src/sockets/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Clients.name, schema: ClientsSchema }]),
    RedisModule,
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
