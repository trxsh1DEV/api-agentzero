import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HardwareModule } from './articles/hardware.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { SocketModule } from './socket/socket.module';
import { ClientsModule } from './clients/clients.module';
import { PeriphericalModule } from './periphericals/periphericals.module';
import { RedisModule } from './sockets/redis.module';
import { SocketModule } from './sockets/socket.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://yago-dev:45573475Ygo-@cluster0.e9u77hm.mongodb.net/agents?retryWrites=true&w=majority&appName=Cluster0',
    ),
    HardwareModule,
    PeriphericalModule,
    ClientsModule,
    RedisModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
