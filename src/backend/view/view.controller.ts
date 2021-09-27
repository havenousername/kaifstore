import { Controller, Get, Req, Res } from '@nestjs/common';
import { ViewService } from './view.service';
import { Request, Response } from 'express';
import { parse } from 'url';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';

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
