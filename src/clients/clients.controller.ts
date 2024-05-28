// clients/clients.controller.ts
import {
  // BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Clients } from './schema/clients.schema';

@Controller('clients') // <-- Aqui você define o prefixo para os endpoints deste controller
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  getClients(): Promise<Clients[]> {
    return this.clientsService.getClients();
  }

  @Post()
  postClient(@Body() data: any): any {
    return this.clientsService.postClient(data);
  }

  @Get(':id')
  getClient(@Param('id') id: string): Promise<Clients> {
    return this.clientsService.getClient(id);
  }
  //
  @Delete(':id')
  deleteClient(@Param('id') id: string): Promise<Clients> {
    return this.clientsService.deleteClient(id);
  }
  @Patch(':id')
  patchClient(@Param('id') id: string, data: Clients): Promise<Clients> {
    return this.clientsService.update(id, data);
  }
}
