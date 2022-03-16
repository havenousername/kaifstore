import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { EditProductDto } from './dto/edit-product.dto';
import { ProductDiscount } from '../model/product-discounts.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    @InjectModel(ProductDiscount)
    private productDiscountsRepository: typeof ProductDiscount,
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

    if (queryOptions.discount) {
      const productDiscounts = await this.productDiscountsRepository.findAll({
        include: { all: true },
      });
      const discounts = productDiscounts.filter(
        (discount) => discount.discount.amount > queryOptions.discount,
      );
      const productIds = discounts.map((i) => i.productId);
      filters['id'] = {
        [Op.in]: productIds,
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
        include: { all: true },
      },
    );
  }

  public getById(id: number) {
    return this.productRepository.findOne({
      include: { all: true },
      where: { id },
    });
  }

  public getByIds(ids: number[]) {
    return this.productRepository.findAll({
      include: { all: true },
      where: { id: ids },
    });
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
    const uuid = dto.uuid ? dto.uuid : v4();
    try {
      const product = await this.productRepository.create({
        ...dto,
        uuid: uuid,
        images: filenames,
      });

      if (dto.discounts) {
        await this.updateDiscounts(dto.discounts, product.id);
      }

      return product;
    } catch (e) {
      filenames.map((fileName) => {
        const [path, file] = fileName.split('/');
        this.fileService.removeFile(file, path);
      });
      throw e;
    }
  }

  public async updateDiscounts(ids: number[], productId: number) {
    ids.map(async (discountId) => {
      await this.productDiscountsRepository.create({
        discountId,
        productId,
      });
    });
  }

  public async removeDiscounts(ids: number[], productId: number) {
    ids.map(async (discountId) => {
      await this.productDiscountsRepository.destroy({
        where: { discountId, productId },
      });
    });
  }

  public async removeProductDiscounts(productId: number) {
    await this.productDiscountsRepository.destroy({
      where: { productId },
    });
  }

  public async delete(id: number): Promise<number> {
    await this.removeProductDiscounts(id);
    return this.productRepository.destroy({ where: { id } });
  }

  public async update(
    dto: EditProductDto,
    images: never | Express.Multer.File[],
  ): Promise<[number, Product[]]> {
    const oldProduct = await this.getById(dto.id);
    if (!oldProduct) {
      throw new HttpException(
        `There is no such product with id ${dto.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (images.length > 0) {
      const imagePaths = images.map((image) => {
        const name = image.originalname;
        if (!this.fileService.hasFile(name, 'products')) {
          return this.fileService.createFile(image, 'products');
        }
        return 'products/' + image.originalname;
      });

      await this.productRepository.update(
        { images: imagePaths },
        { where: { id: dto.id } },
      );
    }

    if (dto.discounts) {
      const fiDiscounts = dto.discounts.filter(
        (discountId) =>
          oldProduct.discounts.filter((d) => d.id === discountId).length === 0,
      );
      const dDiscounts = oldProduct.discounts
        .filter((discount) => !fiDiscounts.includes(discount.id))
        .map((i) => i.id);
      await this.updateDiscounts(fiDiscounts, dto.id);
      await this.removeDiscounts(dDiscounts, dto.id);
    }

    return await this.productRepository.update(
      { ...dto, discounts: undefined },
      { where: { id: dto.id } },
    );
  }
}
