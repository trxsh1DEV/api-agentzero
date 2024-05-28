import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/sockets/redis-utils';
import { Socket } from 'net';

@Injectable()
export class SocketService {
  constructor(private readonly redisService: RedisService) {}
  async postSocket(uid: string, host: string, port: number): Promise<void> {
    await this.redisService.set(uid, JSON.stringify({ host, port }));
  }
  async getSocket(uid: string): Promise<any> {
    return this.redisService.get(uid);
  }

  async getAllSocket(): Promise<any> {
    return this.redisService.getAllRecords();
  }

  async sendCommandAndGetResult(
    clientId: string,
    command: string,
  ): Promise<string> {
    const socketInfo = JSON.parse(await this.getSocket(clientId));
    if (!socketInfo) {
      throw new Error('Client not found');
    }

    const socket = new Socket();

    return new Promise((resolve, reject) => {
      socket.on('error', (error) => {
        reject(error);
      });

      socket.on('end', (error) => {
        reject(error);
      });

      socket.once('connect', () => {
        socket.write(command);
      });

      socket.once('data', (data) => {
        resolve(data.toString());
      });

      socket.connect(socketInfo.port, socketInfo.host);
    });
  }

  async sendFileAndGetResult(
    clientId: string,
    fileObject: any,
  ): Promise<string> {
    const socketInfo = JSON.parse(await this.getSocket(clientId));
    if (!socketInfo) {
      throw new Error('Client not found');
    }
    const socket = new Socket();

    return new Promise((resolve, reject) => {
      fileObject.file.on('data', (data) => {
        socket.write(data);
      });

      // Lida com o fim da transmissão do arquivo
      fileObject.file.once('end', () => {
        // Espera pela resposta do cliente
        socket.once('data', (response) => {
          resolve(response.toString());
        });

        socket.once('error', (error) => {
          reject(error);
        });
      });
      //

      fileObject.file.once('error', (error) => {
        reject(error);
      });
      socket.connect(socketInfo.port, socketInfo.host);
    });
  }
}
