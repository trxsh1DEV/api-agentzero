import { Body, Controller, Get, Post } from '@nestjs/common';
import { PeriphericalService } from './periphericals.service';
import { Peripherical } from './schema/periphericals.schema';

@Controller('peripherical')
export class PeriphericalsController {
  constructor(private readonly periphericalService: PeriphericalService) {}

  @Post('create')
  postArticle(@Body() body: Peripherical) {
    return this.periphericalService.postPeripherical(body);
  }

  @Get('all')
  getArticles() {
    return this.periphericalService.getPeriphericals();
  }
}
