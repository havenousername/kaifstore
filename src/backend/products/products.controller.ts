import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from '../decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Product } from '../model/products.model';
import { Request, Response } from 'express';
import { CustomQuery } from '../decorators/custom-query.decorator';
import { ParseCustomQuery } from '../pipes/custom-query.pipe';
import {
  ProductQuery,
  productQuerySelect,
  productQueryToArray,
} from '../utils/product-query';
import { CustomQueries } from '../interfaces/query';

@ApiTags('Products')
@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @ApiOperation({ summary: 'Get products' })
  @ApiResponse({ status: 200, type: [Product] })
  @Public()
  @Get()
  async getAll(
    @Res() res: Response,
    @Req() req: Request,
    @CustomQuery(
      productQuerySelect,
      new ParseCustomQuery<ProductQuery>({
        filterQueryHandler: productQueryToArray,
      }),
    )
    query: CustomQueries<ProductQuery>,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    const data = await this.productService.getAll(
      {
        page,
        offset: limit,
        structure: 'segmented',
        url: req.url,
        path: req.path,
        details: 'complete',
      },
      query,
    );
    return res.status(HttpStatus.OK).send(data);
  }

  @ApiOperation({ summary: 'Product creation' })
  @ApiResponse({ status: 200, type: Product })
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @Body() dto: CreateProductDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.productService.create(dto, images);
  }
}
