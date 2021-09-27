import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/role-auth.decorator';
import { UsersService } from '../../users/users.service';

@Injectable()
export default class JwtRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) {
        return true;
      }
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' && !token) {
        return Promise.reject(() => {
          throw new HttpException(
            'User does not have required privileges',
            HttpStatus.FORBIDDEN,
          );
        });
      }

      const userEmail = this.jwtService.verify(token).email;
      const user = await this.userService.getUserByEmail(userEmail);
      req.user = user;
      return requiredRoles.some((role) => role === user.role.name);
    } catch (e) {
      throw new HttpException(
        'User does not have required privileges',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
