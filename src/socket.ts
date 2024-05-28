import { Server as NetSocket, Socket } from 'net';
import { isValidJSON, socketData } from './sockets/socketValidate';
import { ClientsService } from './clients/clients.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketService } from './sockets/sockets.service';

export const socketServer = new NetSocket(async (socket: Socket) => {
  let clientUid: string;
  console.log('Socket server started on port', 8080);

  const app = await NestFactory.createApplicationContext(AppModule); // Crie uma instância do aplicativo para obter o serviço
  const clientsService = app.get(ClientsService);
  const socketService = app.get(SocketService);
  // const periphericalService = app.get(PeriphericalService);

  socket.on('data', async (dataRaw: any) => {
    const dataStr = dataRaw.toString();
    try {
      if (!isValidJSON(dataStr)) {
        throw new Error('Dados enviados inválidos!');
      }

      const parsedData = JSON.parse(dataStr);
      const validatedData = socketData(parsedData);
      if (!validatedData) {
        return;
      }

      clientUid = validatedData.uid;

      await socketService.postSocket(
        clientUid,
        socket.remoteAddress,
        socket.remotePort,
      );
      const existingAgent = await clientsService.getClient(clientUid);

      if (existingAgent) {
        await clientsService.update(clientUid, {
          ...validatedData,
          online: true,
        });
        return;
      }
      await clientsService.postClient(validatedData);
      return;
    } catch (err: any) {
      console.log('err', err.message);
    }
  });

  socket.on('end', async () => {
    console.error(`Client ${clientUid} disconnected`);
    const allSockets = await socketService.getAllSocket();
    console.log(allSockets);
  });

  socket.on('error', async (err: { code: string }) => {
    try {
      if (err.code === 'ECONNRESET') {
        console.error(`Connection reset by peer for ${clientUid}`);
        clientsService.deleteClient(clientUid);
        await clientsService.update(clientUid, { online: false }); // Usar o serviço de clientes aqui
      } else {
        console.error(`Socket error for ${clientUid}:`, err);
      }
    } catch (err: any) {
      console.log(err.message);
      return;
    }
  });
});
