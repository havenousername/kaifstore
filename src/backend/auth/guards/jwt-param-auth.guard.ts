import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtParamAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const idParam = +req.params.id;
      if (!idParam || isNaN(idParam)) {
        return Promise.reject(
          () =>
            new HttpException(
              'This route needs id param for proceeding. Either your id is not number or it doesnt exist. Please add it and try again',
              HttpStatus.BAD_REQUEST,
            ),
        );
      }
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' && !token) {
        return Promise.reject(() => {
          throw new UnauthorizedException({
            message: 'User is not authorized',
          });
        });
      }

      req.user = this.jwtService.verify(token);

      const user = await this.userService.getUserByEmail(req.user.email);
      return user.id === idParam;
    } catch (e) {
      throw new UnauthorizedException({ message: 'User is not authorized.' });
    }
  }
}
