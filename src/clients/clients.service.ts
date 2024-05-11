import { Injectable } from '@nestjs/common';
import { Clients } from './schema/clients.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { clients } from 'src/socket';
import { UUID } from 'crypto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Clients.name) private readonly clientModel: Model<Clients>,
  ) {}

  async postClient(body: Clients): Promise<Clients> {
    const create = new this.clientModel(body);
    return create.save();
  }

  async getClients() {
    return this.clientModel.find().exec();
  }
  async getClient(uid: string): Promise<Clients> {
    return this.clientModel.findOne({ uid });
  }
  async update(uid: UUID, dataUpdate: any): Promise<Clients> {
    return await this.clientModel.findOneAndUpdate({ uid }, dataUpdate, {
      new: true,
    });
  }
  async deleteClient(uid: string): Promise<Clients> {
    return this.clientModel.findOneAndDelete({ uid });
  }
  async sendCommandAndGetResult(
    clientId: string,
    command: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const client = clients[clientId];
      if (!client || Object.keys(client).length <= 0) {
        reject(new Error('Client not found'));
      }

      client.socket.write(command);
      // Espera pela resposta do cliente
      client.socket.once('data', (data) => {
        resolve(data.toString());
      });

      client.socket.once('error', (error) => {
        reject(error);
      });
    });
  }
  async sendFileAndGetResult(
    clientId: string,
    fileObject: any,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const client = clients[clientId];

      if (!client || Object.keys(client).length <= 0) {
        reject(new Error('Client not found'));
        return;
      }

      fileObject.file.on('data', (data) => {
        client.socket.write(data);
      });

      // Lida com o fim da transmissão do arquivo
      fileObject.file.once('end', () => {
        // Espera pela resposta do cliente
        client.socket.once('data', (response) => {
          resolve(response.toString());
        });

        client.socket.once('error', (error) => {
          reject(error);
        });
      });

      fileObject.file.once('error', (error) => {
        reject(error);
      });
    });
  }
}
