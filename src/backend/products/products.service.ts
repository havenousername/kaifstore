import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
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
import { ImportImageData } from '../import-export/dto/make-import.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    @InjectModel(ProductDiscount)
    private productDiscountsRepository: typeof ProductDiscount,
    private fileService: FilesService,
    private paginateService: PaginateService,
    @Inject(forwardRef(() => ProductGroupsService))
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
    if (queryOptions && Array.isArray(queryOptions.desc)) {
      order = this.handleQueryOrder(queryOptions.desc, OrderBy.DESC);
    }

    if (queryOptions && Array.isArray(queryOptions.asc)) {
      if (!order) {
        order = this.handleQueryOrder(queryOptions.asc, OrderBy.ASC);
      } else {
        order.push(...this.handleQueryOrder(queryOptions.asc, OrderBy.ASC));
      }
    }

    if (queryOptions && queryOptions.q && isString(queryOptions.q)) {
      filters['name'] = { [Op.like]: `%${queryOptions.q}%` };
    }

    if (queryOptions && queryOptions.priceRange) {
      filters['price'] = {
        [Op.between]: queryOptions.priceRange as [number, number],
      };
    }

    if (queryOptions && queryOptions.attributes) {
      filters['attributes'] = {
        [Op.contains]: queryOptions.attributes as string[],
      };
    }

    if (queryOptions && queryOptions.discount) {
      const productDiscounts = await this.productDiscountsRepository.findAll({
        include: { all: true },
      });
      const discounts = productDiscounts.filter(
        (discount) => discount.discount.amount > (queryOptions.discount ?? 0),
      );
      const productIds = discounts.map((i) => i.productId);
      filters['id'] = {
        [Op.in]: productIds,
      };
    }

    if (
      queryOptions &&
      queryOptions.groupId &&
      isString(queryOptions.groupId)
    ) {
      const groupId = queryOptions.groupId;
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

  public getByUUID(uuid: string) {
    return this.productRepository.findOne({
      include: { all: true },
      where: { uuid },
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

  public async getProducts(): Promise<Product[]> {
    return this.productRepository.findAll({ include: { all: true } });
  }

  private async removeAllDiscounts() {
    return this.productDiscountsRepository.destroy({
      where: {},
      truncate: true,
    });
  }

  public async clear() {
    await this.removeAllDiscounts();
    await this.productRepository.destroy({});
  }

  public async create(
    dto: CreateProductDto,
    images: never | Express.Multer.File[],
    importImages: ImportImageData[],
  ): Promise<Product> {
    const filenames = images
      ? await Promise.all([
          ...images.map((image) =>
            this.fileService.createFile(image, 'products'),
          ),
          ...importImages.map((image) =>
            this.fileService.createFile(image, 'products'),
          ),
        ])
      : [];
    const uuid = dto.uuid ? dto.uuid : v4();
    try {
      const product = await this.productRepository.create({
        ...dto,
        uuid: uuid,
        images: filenames,
        attributes: dto.attributes,
        measurename: dto.measurename,
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

  public async deleteMultiple(ids: number[]): Promise<number[]> {
    return Promise.all(ids.map(async (id) => await this.delete(id)));
  }

  public async delete(id: number): Promise<number> {
    await this.removeProductDiscounts(id);
    return this.productRepository.destroy({ where: { id } });
  }

  public async deleteFromUUID(uuid: string): Promise<number> {
    const product = await this.getByUUID(uuid);
    if (product) {
      return this.delete(product.id);
    }
    throw new HttpException(
      `Product with UUID ${uuid} does not exist in the database`,
      HttpStatus.NOT_FOUND,
    );
  }

  public async deleteAllByGroup(uuid: string | string[]): Promise<number> {
    return this.productRepository.destroy({ where: { groupId: uuid } });
  }

  private async updateImagesFromImport(
    importImages: ImportImageData[],
    oldProduct: Product,
  ): Promise<string[]> {
    let i = 0;
    const imagePaths: string[] = [];
    if (importImages.length > 0) {
      return imagePaths;
    }
    for (const image of importImages) {
      const oldImage = oldProduct.images[i]
        ? oldProduct.images[i].split('/').at(-1)
        : undefined;
      if (
        (oldImage && !this.fileService.hasFile(oldImage, 'products')) ||
        !oldImage
      ) {
        imagePaths.push(await this.fileService.createFile(image, 'products'));
      } else {
        imagePaths.push(oldProduct.images[i]);
      }
      i++;
    }
    return imagePaths;
  }

  public async update(
    dto: EditProductDto,
    images: never | Express.Multer.File[],
    importImages: ImportImageData[],
  ): Promise<[number, Product[]] | [number]> {
    const oldProduct = await this.getById(dto.id);
    if (!oldProduct) {
      throw new HttpException(
        `There is no such product with id ${dto.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (images.length > 0 || importImages.length > 0) {
      const imagePaths = await Promise.all(
        images.map(async (image) => {
          const name = image.originalname;
          if (!this.fileService.hasFile(name, 'products')) {
            return await this.fileService.createFile(image, 'products');
          }
          return 'products/' + image.originalname;
        }),
      );
      imagePaths.push(
        ...(await this.updateImagesFromImport(importImages, oldProduct)),
      );

      await this.productRepository.update(
        { images: imagePaths },
        { where: { id: dto.id } },
      );
    }

    if (dto.discounts && !dto.discountProhibited) {
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
      {
        ...dto,
        discounts: undefined,
      },
      { where: { id: dto.id } },
    );
  }
}
