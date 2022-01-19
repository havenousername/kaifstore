import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../model/roles.model';
import CreateRoleDto from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(dto: CreateRoleDto) {
    const role = await this.getRoleByName(dto.name);
    if (role) {
      throw new HttpException(
        'This role already exists in application',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return await this.roleRepository.create(dto);
  }

  async getRoleByName(name: string) {
    return await this.roleRepository.findOne({ where: { name } });
  }

  async getAll() {
    return await this.roleRepository.findAll({ include: { all: true } });
  }
}
