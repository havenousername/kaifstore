import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from '../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Public()
  @Get('/')
  getAll() {
    return this.productService.getAll();
  }
}
