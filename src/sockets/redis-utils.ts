import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly prefix = 'sockets:';

  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis.Redis,
  ) {}

  async onModuleDestroy() {
    await this.redisClient.quit();
  }

  async get(key: string) {
    return this.redisClient.get(this.prefix + key);
  }

  async set(key: string, value: string, expire?: number): Promise<void> {
    const fullKey = this.prefix + key;
    if (expire) {
      await this.redisClient.set(fullKey, value, 'EX', expire);
    } else {
      await this.redisClient.set(fullKey, value);
    }
  }

  async getAllKeys(): Promise<string[]> {
    let keys: string[] = [];
    let cursor = '0';

    do {
      const result = await this.redisClient.scan(
        cursor,
        'MATCH',
        this.prefix + '*',
      );
      cursor = result[0];
      keys = keys.concat(result[1]);
    } while (cursor !== '0');

    console.log(keys);

    return keys.map((key) => key.replace(this.prefix, ''));
  }

  async getAllRecords(): Promise<{ [key: string]: string }> {
    const keys = await this.getAllKeys();
    const records: { [key: string]: string } = {};

    for (const key of keys) {
      records[key] = await this.get(key);
    }

    return records;
  }

  // Adicione outros métodos conforme necessário, por exemplo, para manipulação de listas, conjuntos, etc.
}
