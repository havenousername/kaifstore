import { Body, Controller, Get } from '@nestjs/common';
import { MoyskladService } from './moysklad.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { MoyskladWebhookService } from './moysklad.webhook.service';
import { WEBHOOK_PRODUCT } from '../app/constants';
import { All } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { MoyskladWebhook } from '../interfaces/moysklad-api-types';

@Controller({
  path: 'moysklad',
  version: '1',
})
export class MoyskladController {
  constructor(
    private service: MoyskladService,
    private hooks: MoyskladWebhookService,
  ) {}

  @ApiOperation({
    summary: 'All products from the moysklad api',
  })
  @ApiResponse({ status: 200 })
  @Public()
  @Get()
  async getAllInitialProducts() {
    return this.service.getProducts();
  }

  @Public()
  @All(WEBHOOK_PRODUCT)
  async onCreateProductFromMoysklad(@Body() product: MoyskladWebhook) {
    return this.hooks.productChanged(product);
  }
}
