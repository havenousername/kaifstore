import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Discount } from '../model/discounts.model';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discount) private discountRepository: typeof Discount,
  ) {}

  public getAll() {
    return this.discountRepository.findAll({ include: { all: true } });
  }

  public async getById(id: number) {
    return await this.discountRepository.findOne({ where: { id } });
  }
}
