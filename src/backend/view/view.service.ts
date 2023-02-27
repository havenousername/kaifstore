import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import createServer from 'next';
import { NextServer } from 'next/dist/server/next';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer | null = null;

  async onModuleInit(): Promise<void> {
    try {
      this.server = createServer({
        dev: process.env.NODE_ENV !== 'production',
        dir: './src/client',
      });
      await this.server.prepare();
    } catch (error) {
      console.error(error);
    }
  }

  getNextServer(): NextServer {
    if (!this.server) {
      throw new HttpException(
        'Next server is not initialized.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.server;
  }
}
