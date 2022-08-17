import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../model/users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import AddRoleDto from './dto/add-role.dto';
import { RolesService } from '../roles/roles.service';
import { DEFAULT_ROLE } from '../app/contstants';
import * as bcrypt from 'bcryptjs';
import { AddressesService } from '../addresses/addresses.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../model/roles.model';
import { Address } from '../model/addresses.model';
import { omit } from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
    private addressService: AddressesService,
  ) {}

  private async getDefaultRole(): Promise<Role> {
    let role = await this.rolesService.getRoleByName(DEFAULT_ROLE.name);
    if (!role) {
      role = await this.rolesService.create(DEFAULT_ROLE);
    }

    return role;
  }

  async create(dto: CreateUserDto) {
    let address: Address;
    if (dto.address) {
      address = await this.addressService.create(dto.address);
    }

    return await this.userRepository.create({
      ...dto,
      addressId: address ? address.id : undefined,
      roleId: dto.roleId ?? (await this.getDefaultRole()).id,
    });
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

  async update(id: number, dto: UpdateUserDto) {
    let hashPassword;
    if (dto.password && dto?.password === dto?.confirmPassword) {
      hashPassword = await bcrypt.hash(dto.password, 5);
    }

    if (dto.addressId && dto.address) {
      await this.addressService.updateAddress(dto.addressId, dto.address);
    }
    const addDto = omit<Omit<UpdateUserDto, 'address'>>(dto, ['address']);
    await this.userRepository.update(
      { ...addDto, password: hashPassword },
      { where: { id } },
    );
    return await this.getUserById(id);
  }

  async delete(id: number) {
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
