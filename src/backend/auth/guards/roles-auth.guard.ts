import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/role-auth.decorator';
import { UsersService } from '../../users/users.service';
import { ForbiddenException } from '../../exceptions/forbidden.exception';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export default class JwtRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

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
      throw new UnauthorizedException('User does not have required privileges');
    }

    const userEmail = this.jwtService.verify(token).email;
    const user = await this.userService.getUserByEmail(userEmail);
    req.user = user;
    const valid = requiredRoles.some((role) => role === user?.role.name);
    if (!valid) {
      throw new ForbiddenException([
        `User does not have required privileges. Required ${requiredRoles.join(
          ',',
        )}, got ${user?.role.name}`,
      ]);
    }
    return valid;
  }
}
