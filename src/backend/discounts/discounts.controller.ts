import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Discount } from '../model/discounts.model';
import { DiscountsService } from './discounts.service';

@Controller({
  path: 'discounts',
  version: '1',
})
export class DiscountsController {
  constructor(private discountsService: DiscountsService) {}
  @ApiOperation({ summary: 'Get all discounts' })
  @ApiResponse({ type: [Discount], status: 200 })
  @Get('/')
  getAll() {
    return this.discountsService.getAll();
  }

  @ApiOperation({ summary: 'Get discount by id' })
  @ApiResponse({ type: Discount, status: 200 })
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.discountsService.getById(id);
  }
}
