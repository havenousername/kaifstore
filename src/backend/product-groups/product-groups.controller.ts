import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ProductGroupsService } from './product-groups.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { ProductGroup } from '../model/product-groups.model';
import { isString } from 'class-validator';
import { Roles } from '../decorators/role-auth.decorator';
import { SUPER_USER_ROLE } from '../app/contstants';
import JwtRolesGuard from '../auth/guards/roles-auth.guard';
import { ViewAuthFilter } from '../filters/view-auth.filter';
import { ViewAdminFilter } from '../filters/view-admin.filter';

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
  getAll() {
    return this.service.getAll();
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

  @ApiOperation({ summary: 'Remove product group' })
  @ApiResponse({ status: 200, type: Number })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @UseFilters(new ViewAuthFilter())
  @UseFilters(new ViewAdminFilter())
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
