import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from '../decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() authDto: AuthUserDto) {
    return this.authService.login(authDto);
  }

  @Public()
  @UsePipes(ValidationPipe)
  @Post('/register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }
}
