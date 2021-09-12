import { Controller, Get } from '@nestjs/common';

@Controller('favourite')
export class FavouriteController {
  @Get()
  getFavourite() {
    return {};
  }
}
