import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../decorators/role-auth.decorator';
import { SUPER_USER_ROLE } from '../app/contstants';
import JwtRolesGuard from '../auth/guards/roles-auth.guard';
import { ViewAuthFilter } from '../filters/view-auth.filter';
import { ViewAdminFilter } from '../filters/view-admin.filter';
import { MakeImportDto } from './dto/make-import.dto';
import { ImportExportService } from './import-export.service';

@Controller({
  path: 'import-export',
  version: '1',
})
export class ImportExportController {
  constructor(private service: ImportExportService) {}

  @ApiOperation({ summary: 'Get products' })
  @ApiResponse({ status: 200, type: [Number] })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @UseFilters(new ViewAuthFilter())
  @UseFilters(new ViewAdminFilter())
  @Post()
  public makeImport(@Body() dto: MakeImportDto[]) {
    this.service.import(dto);
  }
}
