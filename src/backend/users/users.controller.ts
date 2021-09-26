import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Roles } from '../decorators/role-auth.decorator';
import { SUPER_USER_ROLE } from '../app/contstants';
import JwtRolesGuard from '../auth/guards/roles-auth.guard';
import AddRoleDto from './dto/add-role.dto';
import { JwtParamAuthGuard } from '../auth/guards/jwt-param-auth.guard';

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @ApiOperation({ summary: 'All users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Change user role' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post('/role')
  changeUserRole(@Body() dto: AddRoleDto) {
    return this.userService.replaceRole(dto);
  }

  @ApiOperation({ summary: 'Update user properties by admin' })
  @ApiResponse({ status: 200, type: User })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @UsePipes(ValidationPipe)
  @Put('/admin/:id')
  updateUserByAdmin(
    @Param('id') id: number,
    @Body() updateUserDto: CreateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Update user properties' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtParamAuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
