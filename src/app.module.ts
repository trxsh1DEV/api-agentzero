import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { SocketModule } from './socket/socket.module';
import { ClientsModule } from './clients/clients.module';
import { PeriphericalModule } from './periphericals/periphericals.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://yago-dev:45573475Ygo-@cluster0.e9u77hm.mongodb.net/agents?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ArticlesModule,
    PeriphericalModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
