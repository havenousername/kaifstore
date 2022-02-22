import { Module } from '@nestjs/common';
import { ProductGroupsController } from './product-groups.controller';
import { ProductGroupsService } from './product-groups.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductGroup } from '../model/product-groups.model';

@Module({
  controllers: [ProductGroupsController],
  providers: [ProductGroupsService],
  imports: [SequelizeModule.forFeature([ProductGroup])],
  exports: [ProductGroupsService],
})
export class ProductGroupsModule {}
