import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { Document } from 'mongoose';

export type ClientsDocument = Clients & Document;

@Schema({ _id: false })
export class Custom {
  @Prop({
    type: [String],
    default: [],
  })
  department: string[];

  @Prop({
    type: [String],
    default: [],
  })
  collaborator: string[];

  @Prop({
    type: String,
    enum: ['Operador', 'Proprietario'],
    default: 'Operador',
  })
  bond: 'Operador' | 'Proprietario';

  @Prop({ type: String, default: 'N/A' })
  patrimony: string;

  @Prop({ type: String, default: '' })
  date_warranty: string;

  @Prop({ type: String, default: '' })
  nfe: string;

  @Prop({ type: Number })
  purchase_price: number;

  local: string[];
}
@Schema({ _id: false })
export class Periphericals {
  @Prop({ type: Object })
  keyboard: {
    name: string;
    description: string;
    device_id: string;
  };

  @Prop({ type: Object })
  mouse: {
    name: string;
    description: string;
    device_id: string;
  };
  //
  @Prop()
  monitors: [
    {
      edid: string;
      resolution: string;
      gpu: string;
      gpu_id: string;
    },
  ];
}

interface Inventory {
  cpu: {
    model: string;
    architecture: string;
    cpu_freq: number;
    physical_cores: number;
    logic_cores: number;
  };
  memory: {
    total: number;
    available: number;
    used: number;
    percentage: number;
  };
  system: {
    so: string;
    version: string;
    architecture: string;
    domain: string;
    manufacturer: string;
    type_machine: string;
    motherboard: string;
    model: string;
    hostname: string;
    user_logged: string;
    last_update: string;
  };
  storage: {
    total: number;
    used: number;
    available: number;
    percentage: number;
  };
  network: {
    network: string;
    ipv4: string;
    mac: string;
  };
  software: string[];
}

@Schema({ timestamps: true })
export class Clients {
  @Prop({ required: true })
  hwid: string;

  @Prop({ required: true, unique: true })
  uid: UUID;

  // @Prop({ required: true })
  // peripherical_ref: Types.ObjectId;

  @Prop({ required: true, default: true })
  online: boolean;

  @Prop({ type: Object })
  inventory: Inventory;

  @Prop({ type: Custom })
  custom: Custom;

  @Prop({ type: Periphericals })
  periphericals: Periphericals;
}
//
export const ClientsSchema = SchemaFactory.createForClass(Clients);
