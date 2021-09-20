import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from './roles.model';
import CreateRoleDto from './dto/create-role.dto';
import { Public } from '../decorators/public.decorator';

@Controller({
  path: 'roles',
  version: '1',
})
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Public()
  @ApiOperation({ summary: 'Role creation' })
  @ApiResponse({ status: 200, type: Role })
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

  @Public()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getAll() {
    return this.rolesService.getAll();
  }
}
