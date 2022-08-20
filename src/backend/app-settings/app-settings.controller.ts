import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppSettings } from '../model/app-settings.model';
import { Roles } from '../decorators/role-auth.decorator';
import { SUPER_USER_ROLE } from '../app/contstants';
import JwtRolesGuard from '../auth/guards/roles-auth.guard';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Controller({
  path: 'app-settings',
  version: '1',
})
export class AppSettingsController {
  constructor(private appSettingsService: AppSettingsService) {}

  @ApiOperation({
    summary: 'Settings of the application',
  })
  @ApiResponse({ status: 200, type: AppSettings })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @Get('')
  public getSettings() {
    return this.appSettingsService.getSettings();
  }

  @ApiOperation({
    summary: 'Update settings of the application',
  })
  @ApiResponse({ status: 200, type: AppSettings })
  @Roles(SUPER_USER_ROLE.name)
  @UseGuards(JwtRolesGuard)
  @Get('')
  public updateSettings(@Body() dto: UpdateSettingsDto) {
    return this.appSettingsService.updateSettings(dto);
  }
}
