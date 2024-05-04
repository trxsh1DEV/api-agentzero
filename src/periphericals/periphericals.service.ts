import { Injectable } from '@nestjs/common';
import { Peripherical } from './schema/periphericals.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PeriphericalService {
  constructor(
    @InjectModel(Peripherical.name)
    private readonly periphericalModel: Model<Peripherical>,
  ) {}

  async postPeripherical(body: any): Promise<Peripherical> {
    const create = new this.periphericalModel(body);
    return create.save();
  }

  async getPeriphericals() {
    return this.periphericalModel.find().exec();
  }
  async update(uid: string, dataUpdate: any): Promise<Peripherical> {
    return await this.periphericalModel.findOneAndUpdate(
      { host_ref: uid },
      dataUpdate,
      { new: true }, // Para retornar o documento atualizado
    );
  }
}
