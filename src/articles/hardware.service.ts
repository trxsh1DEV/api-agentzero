import { Injectable } from '@nestjs/common';
import { Cpu } from './schema/cpu';
import { Gpu } from './schema/gpu';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HardwareService {
  constructor(
    @InjectModel(Cpu.name) private readonly cpuModel: Model<Cpu>,
    @InjectModel(Gpu.name) private readonly gpuModel: Model<Gpu>,
  ) {}

  async postCpu(body: Cpu): Promise<Cpu> {
    const create = new this.cpuModel(body);
    return create.save();
  }
  async postGpu(body: Gpu): Promise<Gpu> {
    return this.gpuModel.create(body);
  }

  async getArticles() {
    return this.cpuModel.find().exec();
  }

  async cpuCompare(body: string[]) {
    const results = [];

    for (const text of body) {
      const regex = new RegExp(`\\b${text}\\b`);
      results.push(this.cpuModel.findOne({ cpu: regex }).exec());
    }

    return Promise.all(results);
  }
  async gpuCompare(gpu: string[]) {
    const results = [];

    for (const text of gpu) {
      const regex = new RegExp(`\\b${text}\\b`, 'i');
      results.push(this.gpuModel.findOne({ gpu: regex }).exec());
    }

    return Promise.all(results);
  }
}
