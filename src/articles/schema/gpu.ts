import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GpuDocument = HydratedDocument<Gpu>;

@Schema()
export class Gpu {
  @Prop()
  gpu: string;

  @Prop()
  score: number;

  @Prop()
  rank: number;
}

export const GpuSchema = SchemaFactory.createForClass(Gpu);
