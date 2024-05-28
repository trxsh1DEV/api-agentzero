import { Module } from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { HardwareController } from './hardware.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cpu, CpuSchema } from './schema/cpu';
import { Gpu, GpuSchema } from './schema/gpu';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cpu.name, schema: CpuSchema },
      { name: Gpu.name, schema: GpuSchema },
    ]),
  ],
  controllers: [HardwareController],
  providers: [HardwareService],
})
export class HardwareModule {}
