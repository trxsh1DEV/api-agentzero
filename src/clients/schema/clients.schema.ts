import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientsDocument = Clients & Document;

@Schema({ _id: false })
export class Custom {
  @Prop({ type: [String], default: [] })
  department: string[];

  @Prop({ type: [String], default: [] })
  collaborator: string[];

  @Prop({
    type: String,
    enum: ['Operador', 'Proprietario'],
    default: 'Operador',
  })
  bond: 'Operador' | 'Proprietario';

  @Prop({ default: 'N/A' })
  patrimony: string;

  @Prop({ type: String })
  date_warranty: string;

  @Prop({ type: String })
  nfe: string;

  @Prop({ type: Number, default: 0 }) // Adicione um valor padrão para garantir que não seja undefined
  purchase_price: number;

  @Prop({ type: [String], default: [] }) // Adicione @Prop aqui para local
  local: string[];
}

@Schema({ _id: false })
export class Periphericals {
  @Prop({ type: Object }) // Adicione um valor padrão para garantir que não seja undefined
  keyboard: {
    name: string;
    description: string;
    device_id: string;
  };

  @Prop({ type: Object }) // Adicione um valor padrão para garantir que não seja undefined
  mouse: {
    name: string;
    description: string;
    device_id: string;
  };

  @Prop({
    type: [
      {
        edid: { type: String },
        resolution: { type: String },
        gpu: { type: String },
        gpu_id: { type: String },
      },
    ],
    default: [],
  })
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
  motherboard: {
    manufacturer: string;
    motherboard: string;
    model: string;
  };
  system: {
    so: string;
    version: string;
    architecture: string;
    domain: string;
    type_machine: string;
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

  @Prop({ required: true, unique: true }) // Adicione o valor padrão aqui para uuid
  uid: string;

  @Prop({ required: true, default: true })
  online: boolean;

  @Prop({ type: Object })
  inventory: Inventory;

  @Prop({ type: Custom }) // Adicione uma função que retorna um objeto vazio por padrão
  custom: Custom;

  @Prop({ type: Periphericals }) // Adicione uma função que retorna um objeto vazio por padrão
  periphericals: Periphericals;
}

export const ClientsSchema = SchemaFactory.createForClass(Clients);
