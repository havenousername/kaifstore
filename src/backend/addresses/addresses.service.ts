import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from '../model/addresses.model';
import { AddAddressDto } from './dto/add-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address) private addressesRepository: typeof Address,
  ) {}

  async create(dto: AddAddressDto) {
    return this.addressesRepository.create(dto);
  }

  async getById(id: number) {
    return this.addressesRepository.findOne({ where: { id } });
  }

  async updateAddress(id: number, dto: AddAddressDto) {
    return this.addressesRepository.update({ ...dto }, { where: { id } });
  }
}
