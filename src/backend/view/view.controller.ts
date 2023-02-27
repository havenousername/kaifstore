import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ViewService } from './view.service';
import { Request, Response } from 'express';
import { parse } from 'url';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { ViewAuthFilter } from '../filters/view-auth.filter';
import { PRIVATE_VIEW_REDIRECT_ROUTE, SUPER_USER_ROLE } from '../app/constants';
import { Roles } from '../decorators/role-auth.decorator';
import JwtRolesGuard from '../auth/guards/roles-auth.guard';
import { ViewAdminFilter } from '../filters/view-admin.filter';

@ApiTags('Pages')
@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  async handler(req: Request, res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname ?? '', parsedUrl.query);
  }

  @Public()
  @ApiOperation({ summary: 'Index Page' })
  @ApiResponse({ status: 200 })
  @Get('/')
  public async showIndex(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @Public()
  @ApiOperation({ summary: 'Login page' })
  @ApiResponse({ status: 200 })
  @Get(PRIVATE_VIEW_REDIRECT_ROUTE)
  public async showLogin(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @Public()
  @ApiOperation({ summary: 'Register page' })
  @ApiResponse({ status: 200 })
  @Get('/register')
  public async showRegister(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @Public()
  @ApiOperation({ summary: 'Catalog page' })
  @ApiResponse({ status: 200 })
  @Get('/catalog')
  @UseFilters(new ViewAuthFilter())
  public async showCatalog(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @Public()
  @ApiOperation({ summary: 'Catalog details page' })
  @ApiResponse({ status: 200 })
  @Get('/catalog/:id')
  @UseFilters(new ViewAuthFilter())
  public async showCatalogDetails(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @ApiOperation({ summary: 'Settings page' })
  @ApiResponse({ status: 200 })
  @Get('/settings')
  @UseFilters(new ViewAuthFilter())
  public async showSettings(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @ApiOperation({ summary: 'Admin Products Group' })
  @ApiResponse({ status: 200 })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @UseFilters(new ViewAuthFilter())
  @UseFilters(new ViewAdminFilter())
  @Get('/admin/products')
  public async showProductGroups(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @ApiOperation({ summary: 'Admin Products Page' })
  @ApiResponse({ status: 200 })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @UseFilters(new ViewAuthFilter())
  @UseFilters(new ViewAdminFilter())
  @Get('/admin/products/:groupId')
  public async showProducts(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @ApiOperation({ summary: 'Admin Products Edit' })
  @ApiResponse({ status: 200 })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @UseFilters(new ViewAuthFilter())
  @UseFilters(new ViewAdminFilter())
  @Get('/admin/products/:groupId/:id')
  public async showProductsDetails(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @ApiOperation({ summary: 'Admin Products Import/Export' })
  @ApiResponse({ status: 200 })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @UseFilters(new ViewAuthFilter())
  @UseFilters(new ViewAdminFilter())
  @Get('/admin/products/import-export')
  public async showProductsImportExport(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.handler(req, res);
  }

  @ApiOperation({ summary: 'Admin Products Create' })
  @ApiResponse({ status: 200 })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @UseFilters(new ViewAuthFilter())
  @UseFilters(new ViewAdminFilter())
  @Get('/admin/products/create')
  public async showProductsCreate(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @Public()
  @ApiOperation({ summary: 'NextJS bundles' })
  @ApiResponse({ status: 200 })
  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @Public()
  @ApiOperation({ summary: 'Favicon' })
  @ApiResponse({ status: 200 })
  @Get('favicon.ico')
  public async favicon(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }
}
