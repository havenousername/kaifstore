import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../model/products.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesService } from '../files/files.service';
import { v4 } from 'uuid';
import { PaginateOptions, PaginateService } from 'nestjs-sequelize-paginate';
import { ModelCtor } from 'sequelize-typescript';
import { CustomQueries, OrderBy } from '../interfaces/query';
import { ProductQuery } from '../utils/product-query';
import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { isString } from '../utils/type-checkers';
import { ProductGroupsService } from '../product-groups/product-groups.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    private fileService: FilesService,
    private paginateService: PaginateService,
    private productGroupService: ProductGroupsService,
  ) {}

  private handleQueryOrder(
    directions: (string | number)[] | undefined,
    by: OrderBy,
  ) {
    const order: [string, string][] = [];
    if (directions) {
      order.push(
        ...directions.map<[string, string]>((dir) => [String(dir), by]),
      );
    }
    return order;
  }

  public async getAll(
    options: PaginateOptions,
    queryOptions?: CustomQueries<ProductQuery>,
  ): Promise<FindAndCountOptions<Product[]>> {
    let order: [string, string][] | undefined = undefined;
    const filters: WhereOptions = {};
    if (Array.isArray(queryOptions.desc)) {
      order = this.handleQueryOrder(queryOptions.desc, OrderBy.DESC);
    }

    if (Array.isArray(queryOptions.asc)) {
      if (!order) {
        order = this.handleQueryOrder(queryOptions.asc, OrderBy.ASC);
      } else {
        order.push(...this.handleQueryOrder(queryOptions.asc, OrderBy.ASC));
      }
    }

    if (queryOptions.q && isString(queryOptions.q)) {
      filters['name'] = { [Op.like]: `%${queryOptions.q}%` };
    }

    if (queryOptions.priceRange) {
      filters['price'] = {
        [Op.between]: queryOptions.priceRange as [number, number],
      };
    }

    if (queryOptions.characteristics) {
      filters['characteristics'] = {
        [Op.contains]: queryOptions.characteristics as string[],
      };
    }

    if (queryOptions.groupId && isString(queryOptions.groupId)) {
      const groupId: undefined = queryOptions.groupId as undefined;
      const groups =
        await this.productGroupService.getGroupNestedGroupWithProduct(groupId);
      groups.push(groupId);
      filters['groupId'] = {
        [Op.or]: groups,
      };
    }

    return this.paginateService.findAllPaginate(
      {
        ...options,
        model: Product as ModelCtor,
      },
      {
        order: order,
        where: filters,
      },
    );
  }

  public async getMinimalPriceProduct(): Promise<number> {
    return await this.productRepository.min('price');
  }

  public async getMaximumPriceProduct(): Promise<number> {
    return await this.productRepository.max('price');
  }

  public getAllLatest(options: PaginateOptions) {
    return this.getAll(options, { desc: ['createdAt'] });
  }

  public findAll() {
    return this.productRepository.findAll({ include: { all: true } });
  }

  public async create(
    dto: CreateProductDto,
    images: never | Express.Multer.File[],
  ): Promise<Product> {
    const filenames = images
      ? await Promise.all(
          images.map((image) => this.fileService.createFile(image, 'products')),
        )
      : [];
    const uuid = v4();
    try {
      return await this.productRepository.create({
        ...dto,
        uuid: uuid,
        images: filenames,
      });
    } catch (e) {
      filenames.map((fileName) => {
        const [path, file] = fileName.split('/');
        this.fileService.removeFile(file, path);
      });
      throw e;
    }
  }
}
