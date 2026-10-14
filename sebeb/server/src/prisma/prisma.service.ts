import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    const adapter = new PrismaMariaDb({
      host: config.getOrThrow('DB_HOST'),
      user: config.getOrThrow('DB_USER'),
      database: config.getOrThrow('DB_NAME'),
      password: config.getOrThrow('DB_PASSWORD'),
      port: config.getOrThrow('DB_PORT'),
    });

    super({ adapter });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
