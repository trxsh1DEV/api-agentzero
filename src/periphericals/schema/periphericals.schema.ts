import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PeriphericalDocument = Peripherical & Document;

@Schema({ timestamps: true })
export class Peripherical {
  @Prop({ default: 'Normal' })
  status: 'Normal' | 'Critico';

  @Prop()
  host: string;

  @Prop()
  class: string;

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

  @Prop({ unique: true, required: true }) // Correção aqui
  host_ref: Types.UUID;
}

export const PeriphericalSchema = SchemaFactory.createForClass(Peripherical);

// Adicionar índice único explicitamente (opcional, mas recomendado)
PeriphericalSchema.index({ host_ref: 1 }, { unique: true });
