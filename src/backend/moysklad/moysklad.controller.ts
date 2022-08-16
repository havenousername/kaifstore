import { Controller, Get } from '@nestjs/common';
import { MoyskladService } from './moysklad.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';

@Controller({
  path: 'moysklad',
  version: '1',
})
export class MoyskladController {
  constructor(private service: MoyskladService) {}

  @ApiOperation({
    summary: 'All products from the moysklad api',
  })
  @ApiResponse({ status: 200 })
  @Public()
  @Get()
  async getAllInitialProducts() {
    return this.service.getProducts();
  }
}
