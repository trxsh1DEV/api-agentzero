import { Module } from '@nestjs/common';
import { PeriphericalService } from './periphericals.service';
import { PeriphericalsController } from './periphericals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Peripherical,
  PeriphericalSchema,
} from './schema/periphericals.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Peripherical.name, schema: PeriphericalSchema },
    ]),
  ],
  controllers: [PeriphericalsController],
  providers: [PeriphericalService],
})
export class PeriphericalModule {}
