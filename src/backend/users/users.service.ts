import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../model/users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import AddRoleDto from './dto/add-role.dto';
import { RolesService } from '../roles/roles.service';
import { DEFAULT_ROLE } from '../app/contstants';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    let role = await this.rolesService.getRoleByName(DEFAULT_ROLE.name);
    if (!role) {
      role = await this.rolesService.create(DEFAULT_ROLE);
    }
    await user.$set('role', role.id);
    user.role = role;
    return user;
  }

  async replaceRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.rolesService.getRoleByName(dto.name);

    if (user && user.role) {
      await user.$remove('role', user.role);
    }

    if (user && role) {
      await user.$set('role', role.id);
      user.role = role;
      return user;
    }

    throw new HttpException('No such role or user', HttpStatus.NOT_FOUND);
  }

  async update(id: number, dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);
    await this.userRepository.update(
      { ...dto, password: hashPassword },
      { where: { id } },
    );
    return await this.getUserById(id);
  }

  async delete(id: number) {
    console.log(id, 'id');
    return await this.userRepository.destroy({ where: { id } });
  }

  async getAll() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }
}
