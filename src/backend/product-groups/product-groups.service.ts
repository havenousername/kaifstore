import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductGroup } from '../model/product-groups.model';
import { FindOptions } from 'sequelize';
import { OrderBy } from '../interfaces/query';
import { CreateGroupDto } from './dto/create-group.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ProductGroupsService {
  constructor(
    @InjectModel(ProductGroup) private groupRepository: typeof ProductGroup,
    @Inject(forwardRef(() => ProductsService))
    private productService: ProductsService,
  ) {}

  async create(dto: CreateGroupDto) {
    return this.groupRepository.create(dto);
  }

  async getById(id: number, props?: { all: true; nested?: true }) {
    return this.groupRepository.findOne({
      where: { id },
      include: props ?? undefined,
    });
  }

  async getAll() {
    const options: FindOptions<ProductGroup> = {
      include: {
        all: true,
        nested: true,
      },
      order: [['groupId', OrderBy.DESC]],
    };
    return this.groupRepository.findAll(options);
  }

  async getAllRootImportant() {
    return this.groupRepository.findAll({
      where: { groupId: null },
      include: { all: true },
      attributes: ['name', 'id', 'uuid'],
    });
  }

  async getAllRoot() {
    return this.groupRepository.findAll({
      where: { groupId: null },
      include: { all: true },
    });
  }

  async getByUuid(uuid: string): Promise<ProductGroup> {
    return this.groupRepository.findOne({
      where: { uuid },
      include: { all: true },
    });
  }

  private findAllNestedGroups(group: ProductGroup): ProductGroup[] {
    if (!group.childrenGroups) {
      return [group];
    }

    return [group].concat(
      group.childrenGroups.map((g) => this.findAllNestedGroups(g)).flat(),
    );
  }

  public async getGroupNestedGroupWithProduct(uuid: string): Promise<string[]> {
    const group = await this.getByUuid(uuid);
    return this.findAllNestedGroups(group).map((i) => i.uuid);
  }

  public deleteNested(ids: number[]) {
    return this.groupRepository.destroy({ where: { id: ids } });
  }

  public async delete(id: number) {
    const group = await this.getById(id, { all: true, nested: true });
    const groups = this.findAllNestedGroups(group);
    console.log(groups);
    if (groups.length > 0) {
      // delete nested groups products
      await this.productService.deleteAllByGroup(groups.map((i) => i.uuid));
      // delete nested groups
      await this.deleteNested(groups.map((i) => i.id));
    }
    return await this.groupRepository.destroy({ where: { id } });
  }
}
