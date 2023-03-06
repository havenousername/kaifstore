import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductGroup } from '../model/product-groups.model';
import { FindAndCountOptions, FindOptions, Includeable } from 'sequelize';
import { OrderBy } from '../interfaces/query';
import { CreateGroupDto } from './dto/create-group.dto';
import { ProductsService } from '../products/products.service';
import { CreateFromNameDto } from './dto/create-from-name.dto';
import { v4 } from 'uuid';
import { PaginateOptions, PaginateService } from 'nestjs-sequelize-paginate';
import { ModelCtor } from 'sequelize-typescript';

@Injectable()
export class ProductGroupsService {
  constructor(
    @InjectModel(ProductGroup) private groupRepository: typeof ProductGroup,
    @Inject(forwardRef(() => ProductsService))
    private productService: ProductsService,
    private paginateService: PaginateService,
  ) {}

  async create(dto: CreateGroupDto) {
    return this.groupRepository.create(dto);
  }

  async createMultiple(dto: CreateGroupDto[]) {
    return this.groupRepository.bulkCreate(dto);
  }

  async createGroups(
    dto: CreateFromNameDto[],
    separator = '/',
  ): Promise<string[]> {
    // can come something like dto.name = 'ParentParentGroup/Parent/ChildGroup'
    const names = [
      ...new Set<string>(dto.map((i) => i.name.split(separator)).flat()),
    ];
    const groups: string[] = [];
    const groupsToCreate: CreateGroupDto[] = [];
    for (let i = 0; i < names.length; i++) {
      const group = await this.getByName(names[i], { all: true });
      if (group === null) {
        const uuid = v4();
        groupsToCreate.push({
          uuid,
          name: names[i],
          groupId: i !== 0 ? groups[i - 1] : undefined,
        });
      }
      groups.push(names[i]);
    }
    await this.createMultiple(groupsToCreate);

    return groups;
  }

  async getByName(
    name: string,
    include: Includeable = { all: true, nested: true },
  ): Promise<ProductGroup | null> {
    return this.groupRepository.findOne({
      where: { name },
      include,
    });
  }

  async getById(id: number, props?: { all: true; nested?: true }) {
    return this.groupRepository.findOne({
      where: { id },
      include: props ?? undefined,
    });
  }

  async getAll(
    paginateOptions: PaginateOptions,
  ): Promise<FindAndCountOptions<ProductGroup[]>> {
    const options: FindOptions<ProductGroup> = {
      include: {
        all: true,
        nested: true,
      },
      order: [['groupId', OrderBy.DESC]],
    };

    return this.paginateService.findAllPaginate(
      {
        ...paginateOptions,
        model: ProductGroup as ModelCtor,
      },
      {
        ...options,
      },
    );
    // return this.groupRepository.findAll(options);
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

  getByUuid = async (uuid: string) => {
    return this.groupRepository.findOne({
      where: { uuid },
      include: { all: true },
    });
  };

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
    if (!group) {
      throw new HttpException(
        `No group with UUID ${uuid} was found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.findAllNestedGroups(group).map((i) => i.uuid);
  }

  public deleteNested(ids: number[]) {
    return this.groupRepository.destroy({ where: { id: ids } });
  }

  public async delete(id: number) {
    const group = await this.getById(id, { all: true, nested: true });
    if (!group) {
      throw new HttpException(
        `No group with id ${id} was found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const groups = this.findAllNestedGroups(group);
    if (groups.length > 0) {
      // delete nested groups products
      await this.productService.deleteAllByGroup(groups.map((i) => i.uuid));
      // delete nested groups
      await this.deleteNested(groups.map((i) => i.id));
    }
    return await this.groupRepository.destroy({ where: { id } });
  }
}
