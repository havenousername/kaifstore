import { forwardRef, Module } from '@nestjs/common';
import { ProductGroupsController } from './product-groups.controller';
import { ProductGroupsService } from './product-groups.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductGroup } from '../model/product-groups.model';
import { ProductsModule } from '../products/products.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ProductGroupsController],
  providers: [ProductGroupsService],
  imports: [
    SequelizeModule.forFeature([ProductGroup]),
    forwardRef(() => ProductsModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'PRIVATE_KEY',
      signOptions: { expiresIn: '24h' },
    }),
    UsersModule,
  ],
  exports: [ProductGroupsService],
})
export class ProductGroupsModule {}
