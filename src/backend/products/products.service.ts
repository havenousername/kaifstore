import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../model/products.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesService } from '../files/files.service';
import { v4 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    private fileService: FilesService,
  ) {}

  public getAll() {
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
