import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import { SocketService } from './sockets.service';

@Controller('sockets')
export class SocketController {
  constructor(private readonly socketService: SocketService) {}

  @Post('send-command')
  async sendCommand(@Body() data: any) {
    const { clientId, command } = data;
    console.log('rota', clientId, command);
    try {
      const resultado = await this.socketService.sendCommandAndGetResult(
        clientId,
        command,
      );
      console.log('Resultado do comando:', resultado);
      const all = await this.socketService.getAllSocket();
      console.log(all);
      return resultado;
    } catch (error: any) {
      console.error('Erro ao enviar comando:', error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
  @Post('send-file')
  async sendFile(@Req() request) {
    try {
      const file = await request.file();
      const res = await this.socketService.sendFileAndGetResult(
        file.fields.clientId.value,
        file,
      );

      return res;
    } catch (error) {
      console.error('Erro ao processar o arquivo:', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
