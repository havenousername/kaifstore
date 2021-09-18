import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'PRIVATE_KEY',
      signOptions: { expiresIn: '24h' },
    }),
    forwardRef(() => UsersModule),
    PassportModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
