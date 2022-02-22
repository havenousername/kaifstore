import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppModule } from './app/app.module';
import { ViewModule } from './view/view.module';
import { RemoveCookieBearerMiddleware } from './middlewares/remove-cookie-bearer.middleware';

@Module({
  imports: [AppModule, ViewModule],
})
export class ServerModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(RemoveCookieBearerMiddleware)
      .forRoutes({ path: 'v1/auth/logout', method: RequestMethod.POST });
  }
}
