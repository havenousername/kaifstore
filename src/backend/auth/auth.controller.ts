import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from '../decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CookieSetBearerResponseInterceptor } from '../interceptors/cookie-set-bearer-response.interceptor';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(CookieSetBearerResponseInterceptor)
  @Post('/login')
  async login(@Body() authDto: AuthUserDto) {
    return await this.authService.login(authDto);
  }

  @Public()
  @UsePipes(ValidationPipe)
  @UseInterceptors(CookieSetBearerResponseInterceptor)
  @Post('/register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }
}
