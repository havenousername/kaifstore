import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';
import { CookieToBearerMiddleware } from '../middlewares/cookie-to-bearer.middleware';

@Module({
  controllers: [ViewController],
  providers: [ViewService],
  imports: [],
})
export class ViewModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CookieToBearerMiddleware).forRoutes(ViewController);
  }
}
