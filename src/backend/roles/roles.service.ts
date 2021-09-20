import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import CreateRoleDto from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto);
  }

  async getRoleByName(name: string) {
    return await this.roleRepository.findOne({ where: { name } });
  }

  async getAll() {
    return await this.roleRepository.findAll({ include: { all: true } });
  }
}
