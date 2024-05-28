import { Body, Controller, Get, Post } from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { Cpu } from './schema/cpu';
import { Gpu } from './schema/gpu';

@Controller('hardware')
export class HardwareController {
  constructor(private readonly hardwareService: HardwareService) {}

  @Post('cpu/create')
  postCpu(@Body() body: Cpu) {
    return this.hardwareService.postCpu(body);
  }

  @Post('gpu/create')
  postGpu(@Body() body: Gpu) {
    return this.hardwareService.postGpu(body);
  }

  @Get('get-articles')
  getArticles() {
    return this.hardwareService.getArticles();
  }

  @Post('cpu/compare')
  compareCpu(@Body() body: string[]) {
    return this.hardwareService.cpuCompare(body);
  }

  @Post('gpu/compare')
  compareGpu(@Body() body: string[]) {
    return this.hardwareService.gpuCompare(body);
  }
}
