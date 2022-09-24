import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../decorators/role-auth.decorator';
import { SUPER_USER_ROLE } from '../app/constants';
import JwtRolesGuard from '../auth/guards/roles-auth.guard';
import { ViewAuthFilter } from '../filters/view-auth.filter';
import { ViewAdminFilter } from '../filters/view-admin.filter';
import { MakeImportDto } from './dto/make-import.dto';
import { ImportExportService } from './import-export.service';
import { CreateFromNameDto } from '../product-groups/dto/create-from-name.dto';

@Controller({
  path: 'import-export',
  version: '1',
})
export class ImportExportController {
  constructor(private service: ImportExportService) {}

  @ApiOperation({ summary: 'Import products' })
  @ApiResponse({ status: 200, type: [Array] })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @UseFilters(new ViewAuthFilter())
  @UseFilters(new ViewAdminFilter())
  @Post('/groups')
  public makeGroups(@Body() dto: CreateFromNameDto[]) {
    return this.service.importGroups(dto);
  }

  @ApiOperation({ summary: 'Import products' })
  @ApiResponse({ status: 200, type: [Number] })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @UseFilters(new ViewAuthFilter())
  @UseFilters(new ViewAdminFilter())
  @Post('/products')
  public makeImport(@Body() dto: MakeImportDto[]) {
    return this.service.import(dto);
  }
}
