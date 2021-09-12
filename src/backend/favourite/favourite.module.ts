import { Module } from '@nestjs/common';
import { FavouriteController } from './favourite.controller';

@Module({
  controllers: [FavouriteController],
})
export class FavouriteModule {}
