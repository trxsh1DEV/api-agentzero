import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PeriphericalService } from './periphericals.service';
import { Peripherical } from './schema/periphericals.schema';

@Controller('peripherical')
export class PeriphericalsController {
  constructor(private readonly periphericalService: PeriphericalService) {}

  @Post()
  post(@Body() body: Peripherical) {
    return this.periphericalService.postPeripherical(body);
  }

  @Get('all')
  getAll() {
    return this.periphericalService.getAll();
  }
  @Get()
  async getPeriphericals(
    @Query('start') start: number,
    @Query('size') size: number,
    @Query('filters') filters: any,
    @Query('sorting') sorting: any,
  ): Promise<{ data: Peripherical[]; meta: { totalRowCount: number } }> {
    const { data, totalRowCount } =
      await this.periphericalService.getPeriphericals(
        start,
        size,
        filters,
        sorting,
      );
    return { data, meta: { totalRowCount } };
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<Peripherical> {
    return this.periphericalService.getPeripherical(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Peripherical,
  ): Promise<Peripherical> {
    console.log(id, data);
    return this.periphericalService.update(id, data);
  }
}
