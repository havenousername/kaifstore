import { Module } from '@nestjs/common';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Discount } from '../model/discounts.model';

@Module({
  controllers: [DiscountsController],
  providers: [DiscountsService],
  imports: [SequelizeModule.forFeature([Discount])],
})
export class DiscountsModule {}
