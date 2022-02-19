import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  Query,
} from '@nestjs/common';
import { ProductGroupsService } from './product-groups.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { ProductGroup } from '../model/product-groups.model';
import { isString } from 'class-validator';

@Controller({
  path: 'product-groups',
  version: '1',
})
export class ProductGroupsController {
  constructor(private service: ProductGroupsService) {}

  @ApiOperation({
    summary: 'All product groups (all product groups with specific name)',
  })
  @ApiResponse({ status: 200, type: [ProductGroup] })
  @Public()
  @Get()
  getAll(@Query('name') name?: string) {
    return this.service.getAll(name);
  }

  @ApiOperation({
    summary: 'All root product groups',
  })
  @ApiResponse({ status: 200, type: [ProductGroup] })
  @Public()
  @Get('/root')
  getAllRoot(
    @Query('onlyImportant', new DefaultValuePipe(false), ParseBoolPipe)
    onlyImportant?: boolean,
  ) {
    if (onlyImportant) {
      return this.service.getAllRootImportant();
    }
    return this.service.getAllRoot();
  }

  @ApiOperation({ summary: 'Get product group by id/uuid' })
  @ApiResponse({ status: 200, type: ProductGroup })
  @Public()
  @Get(':id')
  getById(@Param('id') id: number | string) {
    if (isString(id)) {
      return this.service.getByUuid(id);
    }
    return this.service.getById(id);
  }
}
