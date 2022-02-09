import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductGroup } from '../model/product-groups.model';
import { FindOptions } from 'sequelize';

@Injectable()
export class ProductGroupsService {
  constructor(
    @InjectModel(ProductGroup) private groupRepository: typeof ProductGroup,
  ) {}

  async getById(id: number) {
    return this.groupRepository.findOne({ where: { id } });
  }

  async getAll(name?: string) {
    const options: FindOptions<ProductGroup> = name
      ? {
          where: { name },
          include: { all: true },
        }
      : { include: { all: true } };
    return this.groupRepository.findAll(options);
  }

  async getAllRoot() {
    return this.groupRepository.findAll({
      where: { groupId: null },
      include: { all: true },
    });
  }

  async getByUuid(uuid: string) {
    return this.groupRepository.findOne({
      where: { uuid },
      include: { all: true },
    });
  }
}
