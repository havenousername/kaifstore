import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/CreateUserDto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  async getAll() {
    return await this.userRepository.findAll({ include: { all: true } });
  }
}
