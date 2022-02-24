import { Controller, Get, Req, Res, UseFilters } from '@nestjs/common';
import { ViewService } from './view.service';
import { Request, Response } from 'express';
import { parse } from 'url';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { ViewAuthFilter } from '../filters/view-auth.filter';
import { PRIVATE_VIEW_REDIRECT_ROUTE } from '../app/contstants';

@ApiTags('Pages')
@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  async handler(req: Request, res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname, parsedUrl.query);
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
  @ApiOperation({ summary: 'Catalog page' })
  @ApiResponse({ status: 200 })
  @Get('/catalog')
  @UseFilters(new ViewAuthFilter())
  public async showCatalog(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @ApiOperation({ summary: 'Settings page' })
  @ApiResponse({ status: 200 })
  @Get('/settings')
  @UseFilters(new ViewAuthFilter())
  public async showSettings(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @ApiOperation({ summary: 'Home page' })
  @ApiResponse({ status: 200 })
  @Get('/')
  @UseFilters(new ViewAuthFilter())
  public async showHome(@Req() req: Request, @Res() res: Response) {
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
