import { Injectable } from '@nestjs/common';
import { Clients } from './schema/clients.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Clients.name) private readonly clientModel: Model<Clients>,
    // private readonly redisService: RedisService,
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
  async update(uid: string, dataUpdate: any): Promise<Clients> {
    return await this.clientModel.findOneAndUpdate({ uid }, dataUpdate, {
      new: true,
    });
  }
  async deleteClient(uid: string): Promise<Clients> {
    return this.clientModel.findOneAndDelete({ uid });
  }
}
