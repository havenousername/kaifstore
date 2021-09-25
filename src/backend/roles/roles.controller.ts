import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import CreateRoleDto from './dto/create-role.dto';
import { Role } from './roles.model';
import { Roles } from '../decorators/role-auth.decorator';
import JwtRolesGuard from '../auth/guards/roles-auth.guard';
import { SUPER_USER_ROLE } from '../app/contstants';

@Controller({
  path: 'roles',
  version: '1',
})
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Role creation' })
  @ApiResponse({ status: 200, type: Role })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.create(roleDto);
  }

  @ApiOperation({ summary: 'Get role by name' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:name')
  getRoleByValue(@Param('name') name: string) {
    return this.rolesService.getRoleByName(name);
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getAll() {
    return this.rolesService.getAll();
  }
}
