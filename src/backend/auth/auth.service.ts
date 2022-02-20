import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/users.model';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<null | User> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      return null;
    }
    let passwordsEqual = await bcrypt.compare(password, user.password);
    // TODO: Delete later, after changing user seeds
    if (!passwordsEqual) {
      passwordsEqual = password === user.password;
    }
    if (user && passwordsEqual) {
      return user;
    }

    return null;
  }

  async getBearerUser(bearerToken: string | undefined): Promise<User> {
    if (!bearerToken) {
      return null;
    }
    const [bearer, token] = bearerToken.split(' ');
    if (bearer !== 'Bearer' && !token) {
      return null;
    }

    const userEmail = this.jwtService.verify(token).email;
    return this.usersService.getUserByEmail(userEmail);
  }

  async login(authDto: AuthUserDto) {
    const user = await this.validateUser(authDto.email, authDto.password);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'User with such email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.create({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { email: user.email, password: user.password };

    return { token: this.jwtService.sign(payload) };
  }
}
