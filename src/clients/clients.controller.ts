// clients/clients.controller.ts
import {
  // BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Clients } from './schema/clients.schema';
import {
  sendCommandAndGetResult,
  sendFileAndGetResult,
} from 'src/utils/sendCommand';
// import * as fs from 'fs';

@Controller('clients') // <-- Aqui você define o prefixo para os endpoints deste controller
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  getClients(): Promise<Clients[]> {
    return this.clientsService.getClients();
  }

  @Get(':id')
  getClient(@Param('id') id: string): Promise<Clients> {
    return this.clientsService.getClient(id);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string): Promise<Clients> {
    return this.clientsService.deleteClient(id);
  }
  @Patch(':id')
  patchClient(@Param('id') id: string, data: Clients): Promise<Clients> {
    return this.clientsService.update(id, data);
  }
  @Post('send-command') // Definindo o método POST
  async sendCommand(@Body() data: any) {
    const { clientId, command } = data;
    try {
      const resultado = await sendCommandAndGetResult(clientId, command);
      console.log('Resultado do comando:', resultado);
      return resultado;
    } catch (error: any) {
      console.error('Erro ao enviar comando:', error.message);
      return error.message;
    }
  }
  @Post('send-file')
  async sendFile(@Req() request) {
    try {
      const file = await request.file();
      const res = await sendFileAndGetResult(file.fields.clientId.value, file);

      return res;
    } catch (error) {
      console.error('Erro ao processar o arquivo:', error);
      throw new InternalServerErrorException('Erro ao processar o arquivo');
    }
  }
}
