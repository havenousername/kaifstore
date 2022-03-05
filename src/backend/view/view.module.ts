import { Module } from '@nestjs/common';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ViewController],
  providers: [ViewService],
  imports: [
    AuthModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'PRIVATE_KEY',
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class ViewModule {}
