import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../model/users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Role } from '../model/roles.model';
import { RolesModule } from '../roles/roles.module';
import { Address } from '../model/addresses.model';
import { AddressesModule } from '../addresses/addresses.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, Address]),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => AddressesModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'PRIVATE_KEY',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
