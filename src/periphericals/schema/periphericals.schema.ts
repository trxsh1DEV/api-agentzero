import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PeriphericalDocument = Peripherical & Document;

@Schema()
export class Peripherical {
  @Prop()
  keyboard: string;

  @Prop()
  mouse: string;

  @Prop()
  monitors: string[];

  @Prop()
  status: string;

  @Prop()
  host: string;

  @Prop()
  class: string;

  @Prop()
  type: string;

  @Prop()
  local: string;

  @Prop()
  person: string;

  @Prop()
  manufacturer: string;

  @Prop()
  sample: string;

  @Prop()
  so: string;

  @Prop()
  department: string[];

  @Prop()
  patrimony: string;

  @Prop()
  date_warranty: string;

  @Prop()
  nfe: string;

  @Prop()
  category: string[];

  @Prop()
  purchase_price: number;

  @Prop()
  host_ref: Types.UUID;
}

export const PeriphericalSchema = SchemaFactory.createForClass(Peripherical);
