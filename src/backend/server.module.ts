import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { ViewModule } from './view/view.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AppModule, ViewModule, AuthModule],
})
export class ServerModule {}
