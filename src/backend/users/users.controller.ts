import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/create')
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
