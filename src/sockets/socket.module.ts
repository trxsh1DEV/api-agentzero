import { Module } from '@nestjs/common';
import { RedisModule } from './redis.module';
import { SocketController } from './socket.controller';
import { SocketService } from './sockets.service';

@Module({
  imports: [RedisModule],
  controllers: [SocketController],
  providers: [SocketService],
  exports: [SocketService],
})
export class SocketModule {}
