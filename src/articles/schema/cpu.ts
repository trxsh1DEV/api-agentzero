import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CpuDocument = HydratedDocument<Cpu>;

@Schema()
export class Cpu {
  @Prop()
  cpu: string;

  @Prop()
  score: number;

  @Prop()
  rank: number;
}

export const CpuSchema = SchemaFactory.createForClass(Cpu);
