import { Module } from '@nestjs/common';
import { MoyskladService } from './moysklad.service';
import { MoyskladController } from './moysklad.controller';

@Module({
  providers: [MoyskladService],
  exports: [MoyskladService],
  controllers: [MoyskladController],
})
export class MoyskladModule {}
