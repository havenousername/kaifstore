import { Controller, Get, Req, Res } from '@nestjs/common';
import { ViewService } from './view.service';
import { Request, Response } from 'express';
import { parse } from 'url';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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

  @ApiOperation({ summary: 'Home Page' })
  @Get('/home')
  public async showHome(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @ApiOperation({ summary: 'NextJS bundles' })
  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @ApiOperation({ summary: 'Favicon' })
  @Get('favicon.ico')
  public async favicon(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }
}
