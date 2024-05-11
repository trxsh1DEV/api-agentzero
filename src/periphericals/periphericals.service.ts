import { Injectable } from '@nestjs/common';
import { Peripherical } from './schema/periphericals.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterItem, SortingItem } from './types';

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

  async getAll() {
    return this.periphericalModel.find().exec();
  }

  async getPeriphericals(
    start: number,
    size: number,
    filters: FilterItem[],
    sorting: SortingItem[],
  ): Promise<{ data: Peripherical[]; totalRowCount: number }> {
    const query = this.periphericalModel.find();
    if (typeof filters === 'string') {
      filters = JSON.parse(filters);
    }

    if (filters) {
      filters.forEach((filter) => {
        const regex = new RegExp(filter.value, 'i');
        query.where(filter.id).regex(regex);
      });
    }

    if (typeof sorting === 'string') {
      sorting = JSON.parse(sorting);
    }

    if (sorting && sorting.length > 0) {
      sorting.forEach((sort: any) => {
        query.sort({ [sort.id]: sort.desc ? -1 : 1 });
      });
    }

    const totalRowCount = await this.periphericalModel
      .countDocuments(query)
      .exec();

    const data = await query.skip(start).limit(size).exec();

    return { data, totalRowCount };
  }

  async update(_id: string, dataUpdate: any): Promise<Peripherical> {
    return await this.periphericalModel.findOneAndUpdate({ _id }, dataUpdate, {
      new: true,
    });
  }
  async getPeripherical(uid: string): Promise<Peripherical> {
    return this.periphericalModel.findById(uid);
  }
}
