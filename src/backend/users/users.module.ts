import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'PRIVATE_KEY',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
