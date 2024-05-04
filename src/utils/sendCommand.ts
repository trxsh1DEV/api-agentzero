import { clients } from 'src/socket';
// import fs from 'fs';

export async function sendCommandAndGetResult(
  clientId: string,
  command: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = clients[clientId];
    if (!client || Object.keys(client).length <= 0) {
      reject(new Error('Client not found'));
      return;
    }

    // Envia o comando para o cliente via socket
    client.socket.write(command);

    // Espera pela resposta do cliente
    client.socket.once('data', (data) => {
      // Resolve a promessa com a resposta do cliente
      resolve(data.toString());
    });

    // Lida com erros de comunicação
    client.socket.once('error', (error) => {
      reject(error);
    });
  });
}

export async function sendFileAndGetResult(
  clientId: string,
  fileObject: any,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = clients[clientId];

    if (!client || Object.keys(client).length <= 0) {
      reject(new Error('Client not found'));
      return;
    }

    fileObject.file.on('data', (data) => {
      client.socket.write(data);
    });

    // Lida com o fim da transmissão do arquivo
    fileObject.file.once('end', () => {
      // Espera pela resposta do cliente
      client.socket.once('data', (response) => {
        resolve(response.toString());
      });

      client.socket.once('error', (error) => {
        reject(error);
      });
    });

    fileObject.file.once('error', (error) => {
      reject(error);
    });
  });
}
